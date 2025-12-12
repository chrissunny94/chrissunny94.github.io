# Pose detection of humans using Camera 




| Category | Approach Description | Key Papers / Models | Pros | Cons |
|----------|----------------------|----------------------|------|------|
| Top-Down 2D Pose Estimation | Detect person → estimate keypoints inside each bounding box | OpenPose (2017), AlphaPose, HRNet (2019), SimpleBaseline | High accuracy, robust for single/multi-person | Slow for many people, depends on detector |
| Bottom-Up 2D Pose Estimation | Detect all keypoints globally → group into individuals | OpenPose PAF, Associative Embedding, DeepCut, HigherHRNet | Fast in crowds, no person detector needed | Grouping errors, slightly less accurate |
| Transformer-Based 2D Pose | Global joint reasoning using Vision Transformers | TokenPose, HRFormer, PETR, MViT-Pose | SOTA accuracy, long-range context | Computationally heavy |
| Monocular 3D Pose (Image → 3D Skeleton) | Predict 3D joints from a single RGB frame | VNect (2017), HMR, SPIN, METRO, CLIFF, PARE | No multi-view needed, real-time possible | Depth ambiguity, relies on priors |
| Video-Based 3D Pose (Temporal) | Use sequences (RNN/CNN/Transformers) for stable 3D pose | VIBE (2020), TCMR, TMR, MotionBERT, MixSTE | Smooth & stable, handles occlusion | Requires video stream |
| Model-Based Mesh Recovery | Predict full human mesh (SMPL) from a monocular RGB | HMR, SMPLify-X, SPIN, PARE, FrankMocap, ROMP | Full mesh output, good for animation | Complex, compute-heavy |
| Regression-Based Pose | Directly regress joint coordinates or heatmaps | DeepPose (Google) | Simple & fast | Lower accuracy today |
| Heatmap-Based Keypoints | Predict per-joint 2D heatmaps | Hourglass, CPN, HRNet | High accuracy, robust | More memory, extra post-processing |



GATs compute attention coefficients between nodes, allowing the model to focus on the most relevant neighbors when updating node embeddings.

✔️ Advantages

    Learns which neighbors matter most

    Works on graphs with varying degrees

    Multi-head attention improves stability

    Parallelizable (unlike RNN-based GNNs)

    No need for Laplacian eigenvectors

## 🎥 Related Video

<iframe width="560" height="315"
src="https://www.youtube.com/embed/XJyVrdXujX4"
title="Related YouTube Video"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>


| Model | Key Mechanism | Strengths | Weaknesses | Best For |
|------|----------------|-----------|------------|----------|
| **GCN** (Kipf & Welling, 2017) | Fixed normalized adjacency for message passing | Fast, simple | Treats all neighbors equally | Node classification, semi-supervised learning |
| **GraphSAGE** (2017) | Sampling + aggregation (mean, LSTM, pooling) | Handles large graphs | Aggregators may lose structure | Inductive learning on huge graphs |
| **GAT** (2018) | Attention-based neighbor weighting | Learns importance of neighbors | Slower on large/dense graphs | Social networks, molecules, citation networks |
| **Gated GNN / GGNN** (2016) | Gated recurrent updates | Captures sequential structure | Harder to train | Program analysis, chemistry |
| **Graph Transformer** (2020–) | Global self-attention | Handles long-range relations | Computationally heavy | Molecules, scene graphs, NLP-style tasks |
