# Jb Anmol

**AI Engineer with a deep interest in multimodal AI research.**

I build and evaluate AI applications across vision, language, audio and structured data. My work connects model experiments and data pipelines with interfaces that help people inspect evidence, review outputs and make decisions.

Especially interested in how models learn representations across modalities, and how we can evaluate their failures before relying on them.

[Portfolio](https://www.jbanmol.space/) · [Research notebook](https://www.jbanmol.space/notebook) · [LinkedIn](https://linkedin.com/in/jbanmol) · [Email](mailto:jbanmol9@gmail.com)

## Current work

I am an **AI Engineer at Kidaura** and a **BS Data Science and Applications student at IIT Madras**.

At Kidaura, I build Care OS: workflows that turn clinical reports into evidence-linked plan drafts for clinician review. I own product and workflow decisions, direct coding agents, review the implementation, and test and iterate on the system. Care OS is under controlled evaluation; clinicians remain responsible for clinical decisions. Public examples use synthetic cases.

[Care OS case study](https://www.jbanmol.space/#care-os-case-study)

## Selected applications

### Industrial Visual Defect Inspector

PatchCore and DINOv2 anomaly detection, defect heatmaps, category-specific calibration and saved human reviews. The evaluation examines missed defects and transfer to new datasets, rather than relying on one accuracy number.

[Case study and evaluation](https://www.jbanmol.space/#industrial-visual-inspector) · [Try the demo](https://industrial-inspector-guest-jbanmol.streamlit.app/)

### Secure Contract Review Workspace

PDF clause extraction linked to original source passages, isolated guest sessions, review history and PostgreSQL persistence. Extracted candidates support human review; they are not legal conclusions.

[Case study](https://www.jbanmol.space/#contract-review-workspace) · [Try the demo](https://contract-review-guest-demo.onrender.com/)

### Clinical Trial Screening Assistant

BM25 search over 448,631 frozen trial records, source-linked experimental Qwen drafts and saved reviews for synthetic cases. This is a research prototype, not a clinically validated eligibility system.

[Case study and limits](https://www.jbanmol.space/#clinical-trial-screening) · [Try the demo](https://clinical-render-preflight.onrender.com/guest)

### Retail Decision Lab

Forecasting connected to budget-constrained inventory plans and CSV exports. On a frozen M5 evaluation covering 50 products at one store over 28 days, LightGBM achieved 35.14% WAPE versus 41.61% for seasonal-naive forecasting. The public demo uses invented history for exploration.

[Case study and evaluation](https://www.jbanmol.space/#retail-decision-lab) · [Try the demo](https://retail-decision-lab-demo.onrender.com/)

These links expose demos and documented case studies. The core application repositories and model artifacts are private. Free hosts can take a little time to wake up.

## Public code and evaluation

- **[Audio classification experiments](https://github.com/jbanmol/robust-audio-genre-classification):** PyTorch, ConvNeXt-Nano, log-mel features, dynamic mixing and fold/crop inference. Experiment code is public; V8 checkpoints and a verified V8 test score are not released.
- **[Text classification and evaluation](https://github.com/jbanmol/comment-moderation-nlp-ensemble):** a leakage audit of earlier experiments, followed by a separate Civil Comments baseline with training-only preprocessing and held-out evaluation. The [published report](https://github.com/jbanmol/comment-moderation-nlp-ensemble/blob/main/civil_comments/RESULTS.md) records macro-F1 0.764925 on a deduplicated 20,000-row test subset. It is a binary benchmark, separate from the original four-class competition.
- **[Competition case studies](https://www.jbanmol.space/#chest-xray):** chest X-ray classification, answer ranking and equipment-price prediction. The portfolio separates public and private rankings and distinguishes the evaluated competition systems from their demos.

## Public contributions

- **PO-LICE, a team document-review prototype:** [evidence-bound extraction, merged PR #5](https://github.com/Aparna-Jha-05/kaya-ai/pull/5) and [upload provenance and page evidence, merged PR #9](https://github.com/Aparna-Jha-05/kaya-ai/pull/9).
- **ADHD agent tooling:** [practical CLI/SDK quickstart, merged documentation PR #31](https://github.com/UditAkhourii/adhd/pull/31).

## Research interests

Questions I want to explore more deeply:

- How can models align and combine evidence from language, images and audio?
- How do representations and confidence behave when data shifts away from the training setting?
- How can human feedback help people detect, correct and recover from model failures?

I am interested in research collaboration around multimodal learning, human-AI interaction and reliable healthcare AI.

**Tools I use:** Python, PyTorch, scikit-learn, SQL, Hugging Face Transformers, FastAPI, React/TypeScript and PostgreSQL.
