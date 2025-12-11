
## Keeping Robots on Track: A C++ & ROS Lane Detection Project

For any autonomous ground robot, from a self-driving car to a small warehouse bot, the ability to perceive the environment is critical. One of the most fundamental tasks in navigation is identifying and following lanes. This is where a fantastic, focused project from developer Chris Sunny (chrissunny94) comes in: **[Lane_Detection_CPP_ROS](https://github.com/chrissunny94/Lane_Detection_CPP_ROS)**.

This repository isn't just a theoretical script; it's a practical, high-performance solution built for real robots.

### What It Is

The project is a **C++ implementation of lane detection** built to plug directly into the **Robot Operating System (ROS)**.

At its core, it uses the industry-standard **OpenCV (Open Source Computer Vision) library** to perform the complex task of image processing. It's designed to take a video feed from a robot's camera, analyze each frame to identify lane markings on the ground, and then calculate the lane's position and curvature.


## 🎥 Lane Detection Demo

<p align="center">
  <iframe width="560" height="315"
    src="https://www.youtube.com/embed/4wGohufr2_c"
    title="Lane Detection Demo"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</p>


### The "C++" and "ROS" Advantage

What makes this project stand out is its choice of technologies:

1.  **Why C++?** In robotics, speed is not a luxury—it's a necessity. A robot must be able to react to its environment in real-time. C++ is a high-performance language, allowing the computationally heavy OpenCV algorithms to run as fast as possible. This ensures the robot gets a constant, low-latency stream of data about its position in the lane.

2.  **Why ROS?** The "ROS interfaces" are the key to making this project practical. It's not just a script that draws on an image; it's a modular ROS *node*. This means it can seamlessly "talk" to other parts of a robot.
    * It **subscribes** to a camera's image topic.
    * It **processes** the images to find the lanes.
    * It **publishes** its findings (like the lane's center or curve) to other ROS topics.
    * A separate *control* node can then listen to this data to steer the robot's motors, creating a complete lane-following system.

The repository, which was tested on ROS-kinetic, is structured as a standard ROS package, complete with `src`, `launch`, and `include` folders. This means anyone familiar with ROS can get it running with a simple `catkin_make`.

For anyone looking to build an autonomous ground vehicle or just learn how high-performance computer vision is integrated into a real robotics framework, this repository is a perfect case study.




## 1. Converting ROS Image to OpenCV

Incoming ROS camera messages are converted to OpenCV `cv::Mat` using `cv_bridge`:

```cpp
cv_bridge::CvImagePtr cv_ptr;
cv_ptr = cv_bridge::toCvCopy(msg, sensor_msgs::image_encodings::BGR8);
cv::Mat frame = cv_ptr->image;
````

This allows standard OpenCV processing on the image.

---

## 2. Preprocessing

### Grayscale Conversion

The input frame is converted to grayscale to simplify processing:

```cpp
cv::cvtColor(frame, gray, cv::COLOR_BGR2GRAY);
```

### Gaussian Blur

A Gaussian blur is applied to reduce noise and smooth the image:

```cpp
cv::GaussianBlur(gray, blurred, cv::Size(5,5), 0);
```

---

## 3. Edge Detection

Canny edge detection is applied to detect strong gradients corresponding to lane lines:

```cpp
cv::Canny(blurred, edges, 50, 150);
```

---

## 4. Region of Interest (ROI)

Only the relevant part of the image (road area) is processed:

```cpp
cv::Mat mask = cv::Mat::zeros(edges.size(), edges.type());
std::vector<cv::Point> polygon = { /* ROI vertices */ };
cv::fillPoly(mask, std::vector<std::vector<cv::Point>>{ polygon }, cv::Scalar(255));
cv::Mat roi;
cv::bitwise_and(edges, mask, roi);
```

This removes irrelevant edges from the sky or roadside.

---

## 5. Hough Line Transform

Line segments are detected using the Probabilistic Hough Transform:

```cpp
std::vector<cv::Vec4i> lines;
cv::HoughLinesP(roi, lines, 1, CV_PI/180, 50, 40, 100);
```

Each `Vec4i` contains `(x1, y1, x2, y2)` for a line segment.

---

## 6. Lane Classification and Averaging

Lines are classified as left or right based on slope:

```cpp
float slope = float(y2 - y1) / float(x2 - x1 + 1e-6);
```

* Negative slope → left lane
* Positive slope → right lane

Segments are averaged to produce stable left/right lane lines.

---

## 7. Drawing Lane Lines

The final lane lines are drawn on the frame:

```cpp
cv::line(frame, cv::Point(x1, y1), cv::Point(x2, y2), cv::Scalar(0,255,0), 3);
```

The annotated frame can then be published back to ROS or displayed in RViz.

---

## Summary

The OpenCV C++ pipeline:

1. Convert ROS image to OpenCV `cv::Mat`
2. Grayscale conversion and Gaussian blur
3. Canny edge detection
4. Apply ROI mask
5. Detect line segments with Hough Transform
6. Classify and average left/right lanes
7. Draw lane lines on the frame

This lightweight pipeline enables real-time lane detection for ROS-based autonomous navigation.


**[Check out the Lane_Detection_CPP_ROS project on GitHub](https://github.com/chrissunny94/Lane_Detection_CPP_ROS)!**