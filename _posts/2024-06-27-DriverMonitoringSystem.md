# Driver monitoring system



# Driver Monitoring System (DMS) — Component Comparison

| Component               | Purpose                                 | Common Approaches / Models                        | Key Papers / References                   |
|-------------------------|-----------------------------------------|-------------------------------------------------|------------------------------------------|
| Face Detection          | Detect driver face                      | Haar Cascade, HOG+SVM, MTCNN, RetinaFace, YOLO | RetinaFace (2020)                         |
| Facial Landmark Detection | Detect key points on face             | dlib 68-point, MediaPipe FaceMesh, FAN, 3DMM   | MediaPipe FaceMesh (2020), FAN (2017)    |
| Head Pose Estimation    | Estimate yaw, pitch, roll               | PnP, 3D Morphable Models, Hopenet, FSA-Net     | Hopenet (2018), FSA-Net (2019)           |
| Eye Tracking & Blink Detection | Detect eye closure / drowsiness  | EAR (Eye Aspect Ratio), Iris tracking, CNN      | EAR / PERCLOS (2000s)                     |
| Gaze Estimation         | Predict driver gaze direction           | Gaze360, ETH-XGaze, OpenGaze, MPIIGaze         | Gaze360 (2019), MPIIGaze (2015)          |
| Drowsiness / Distraction | Detect fatigue or inattentiveness     | Blink rate, yawn detection, head nodding       | DeepVAD (2021)                            |
| End-to-End Driver State | Combine multiple signals for prediction | CNN / RNN pipelines, multi-modal fusion        | OpenDriver (2022)                         |


### 👁️ Driver Attention Monitoring

[Watch on YouTube](https://www.youtube.com/watch?v=VaIdEZl5bl4)

<iframe width="560" height="315"
src="https://www.youtube.com/embed/VaIdEZl5bl4"
title="Driver Monitoring System Overview"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

This video explains how modern Driver Monitoring Systems use cameras and machine learning to track eye gaze, head position, and attention state to improve road safety. It demonstrates real-time analysis of driver behavior, including distraction and alertness.

---

### 🚗 DMS Demo — Gaze & Attention Tracking

[Watch on YouTube](https://www.youtube.com/watch?v=PWvhi2XUX2E)

<iframe width="560" height="315"
src="https://www.youtube.com/embed/PWvhi2XUX2E"
title="Driver Monitoring System Demo"
frameborder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>