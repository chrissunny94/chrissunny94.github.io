# Pose detection of humans using Camera 


## 🎥 Related Video

<iframe width="560" height="315"
src="https://www.youtube.com/embed/XJyVrdXujX4"
title="Related YouTube Video"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>


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
