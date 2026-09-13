# Public evidence index

Profile evidence reviewed on **13 September 2026**. Code inspection, saved experiment output, merged contributions, and live model execution are different evidence levels.

## Project claims

| Profile statement | Public evidence | What it establishes |
|---|---|---|
| PO-LICE extraction contribution | [Merged PR #5](https://github.com/Aparna-Jha-05/kaya-ai/pull/5) | Authored implementation and tests for an extraction cascade; not a clinical or production benchmark |
| Upload provenance and evidence geometry | [Merged PR #9](https://github.com/Aparna-Jha-05/kaya-ai/pull/9) | Contribution to project-scoped retries, source provenance, and page evidence |
| Evidence-consistent 3D constraints | [Merged PR #35](https://github.com/Aparna-Jha-05/kaya-ai/pull/35) | Replaces hard-coded display limits with backend evidence |
| PO-LICE demo | [Team README](https://github.com/Aparna-Jha-05/kaya-ai) and existing walkthrough GIF | A synthetic hackathon demonstration; no fresh acceptance run is claimed |
| AutoEIT 120 populated final fields | [CSV directory at cba27e2](https://github.com/jbanmol/autoeit-asr-human-audit-pipeline/tree/cba27e2d955abbe5d23106f09d94be2799d3d430/outputs/review_csv) | Four files, each with 30 unique target items numbered 1–30 and 30 nonempty final fields; not transcription accuracy |
| Audio five folds and three crops | [Training](https://github.com/jbanmol/robust-audio-genre-classification/blob/32db37c15667720b1de0c4a0349f1f80c8cfc946/v8_train.py), [inference](https://github.com/jbanmol/robust-audio-genre-classification/blob/32db37c15667720b1de0c4a0349f1f80c8cfc946/v8_submit.py) | Implemented inference configuration when all checkpoints exist; V8 notebook is unexecuted |
| Moderation results | [V4 notebook at 3ee35e8](https://github.com/jbanmol/comment-moderation-nlp-ensemble/blob/3ee35e85d2743532da3927989b3c73cdc1f4bfbe/23f1001015-notebook-v4.ipynb) | Saved run outputs, with preprocessing and selection limitations |
| Agent-tooling documentation | [Merged ADHD #31](https://github.com/UditAkhourii/adhd/pull/31) | An upstream documentation contribution |
| Hermes investigation | [Closed, unmerged #15523](https://github.com/NousResearch/hermes-agent/pull/15523) | Timeout regression tests; not an accepted upstream fix |

Kidaura affiliation and IIT Madras study context are biographical statements. The [public portfolio](https://jbanmol.tech) introduces the healthcare work. Private clinical data, model metrics, and private PRs are not reproduced here.

## Regenerate the result visual

```bash
python -m pip install -r requirements-visuals.txt
python tools/render_results.py
```

The script downloads only the public notebook at the pinned commit, extracts the six saved summary values, checks the snapshot, and writes the chart plus [machine-readable provenance](assets/moderation-results.json). It does not train or evaluate a model. A local notebook can be supplied with `--notebook PATH`.

The chart uses a full 0–1 axis. It presents results from a single recorded workflow, not a controlled causal ablation. TF-IDF/SVD and scaling precede CV; blend weights and additive class-score offsets are selected using the same OOF labels as the reported score. A separate evaluation is needed before using these numbers as generalization evidence.

## Presentation choices

GitHub-native links, expandable details, a compact architecture diagram, and an existing synthetic demo provide the interaction. The profile uses no tracking widgets, skill percentages, activity trophies, unverified benchmark badges, or private repository links.
