"""Render the public notebook's saved outputs; this does not run training."""
import argparse
import json
from pathlib import Path
import re
from urllib.request import urlopen

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

SOURCE = "https://raw.githubusercontent.com/jbanmol/comment-moderation-nlp-ensemble/3ee35e85d2743532da3927989b3c73cdc1f4bfbe/23f1001015-notebook-v4.ipynb"


def extract(notebook):
    chunks = []
    for cell in notebook["cells"]:
        for output in cell.get("outputs", []):
            text = output.get("text", "")
            chunks.append(text if isinstance(text, str) else "".join(text))
    text = "\n".join(chunks).split("FINAL RESULTS SUMMARY")[-1]
    rows = []
    for label, pattern in [
        ("Logistic regression", r"LR \(text\) OOF macro F1\s*:\s*([0-9.]+)"),
        ("CatBoost", r"CatBoost OOF macro F1\s*:\s*([0-9.]+)"),
        ("LightGBM", r"LightGBM OOF macro F1\s*:\s*([0-9.]+)"),
        ("XGBoost", r"XGBoost\s+OOF macro F1\s*:\s*([0-9.]+)"),
        ("Selected ensemble", r"Ensemble OOF macro F1\s*:\s*([0-9.]+)"),
        ("Selected score offsets", r"\+ Threshold tuning\s*:\s*([0-9.]+)"),
    ]:
        match = re.search(pattern, text)
        if match is None:
            raise ValueError(f"Saved result missing: {label}")
        value = float(match[1])
        if not 0 <= value <= 1:
            raise ValueError(f"Invalid macro F1: {value}")
        rows.append({"label": label, "macro_f1": value})
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--notebook", type=Path, help="Optional local copy of the pinned source notebook")
    args = parser.parse_args()
    if args.notebook:
        notebook = json.loads(args.notebook.read_text())
    else:
        with urlopen(SOURCE, timeout=30) as response:
            notebook = json.load(response)
    rows = extract(notebook)
    # One snapshot check: prevent a changed parser or source from silently altering the figure.
    assert [r["macro_f1"] for r in rows] == [0.60453, 0.77132, 0.79170, 0.79945, 0.80659, 0.80701]
    dest = Path(__file__).resolve().parents[1] / "assets"
    dest.mkdir(exist_ok=True)
    (dest / "moderation-results.json").write_text(json.dumps({
        "source": SOURCE,
        "metric": "Recorded V4 exploratory OOF macro F1",
        "limitations": "Preprocessing fitted before CV; ensemble weights and offsets selected on the same OOF labels. Not an independent test benchmark.",
        "results": rows,
    }, indent=2) + "\n")
    plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "svg.fonttype": "path", "svg.hashsalt": "jbanmol-v4-recorded"})
    fig, ax = plt.subplots(figsize=(9.6, 4.6), facecolor="#ffffff")
    fig.subplots_adjust(left=.25, right=.96, top=.76, bottom=.25)
    ax.set_facecolor("#ffffff")
    ax.barh(range(len(rows)), [r["macro_f1"] for r in rows], height=.57,
            color=["#64748b"] * 4 + ["#2563eb"] * 2)
    ax.set_yticks(range(len(rows)), [r["label"] for r in rows], color="#172033")
    ax.invert_yaxis()
    ax.set_xlim(0, 1)
    ax.set_xlabel("Macro F1 (0–1)", color="#334155")
    ax.tick_params(axis="both", length=0, labelcolor="#334155")
    ax.xaxis.grid(True, color="#e2e8f0", linewidth=.7)
    ax.set_axisbelow(True)
    for spine in ax.spines.values():
        spine.set_visible(False)
    for i, row in enumerate(rows):
        ax.text(row["macro_f1"] + .012, i, f'{row["macro_f1"]:.5f}', va="center", color="#172033")
    fig.text(.04, .94, "Comment moderation · recorded V4 experiment", size=18, weight="bold", color="#0f172a")
    fig.text(.04, .875, "198,000 labeled rows · four classes · saved notebook outputs", size=11, color="#475569")
    fig.text(.04, .09, "Exploratory OOF scores: preprocessing precedes CV; selection reuses OOF labels.", size=10, color="#334155")
    fig.text(.04, .045, "Not an independent test benchmark. Source: notebook at 3ee35e8.", size=10, color="#334155")
    fig.savefig(dest / "moderation-results.svg", metadata={"Date": None, "Title": "Recorded V4 results with validation limitations"})
    plt.close(fig)
    print("Verified 6 saved values; wrote SVG and provenance JSON.")


if __name__ == "__main__":
    main()
