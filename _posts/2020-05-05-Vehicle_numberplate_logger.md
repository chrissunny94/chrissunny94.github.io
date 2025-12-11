## Automatic Number Plate Recognition in Python: A Look at the "Vehicle Logger" Project

Automatic Number Plate Recognition (ANPR) is one of the most fascinating and practical applications of computer vision. You see it everywhere: in parking garages, on toll roads, and for security monitoring. It’s the magic that allows a camera to identify a vehicle just by its license plate.

If you've ever wanted to build such a system, a great place to start is the **[Vehicle\_Number\_plate\_logger\_Python](https://github.com/chrissunny94/Vehicle_Number_plate_logger_Python)** repository on GitHub. This project by Chris Sunny isn't just a simple script; it's a comprehensive toolkit for detecting, recognizing, and logging license plates, all built with Python.


<iframe width="560" height="315" src="https://www.youtube.com/embed/BoUYBXSpq1c" frameborder="0" allowfullscreen></iframe>

### How It Works: The ANPR Pipeline

The project cleverly combines several key technologies to create a complete pipeline:

1.  **Vehicle Detection:** Before you can find a *plate*, you usually need to find the *car*. The repository includes **Haar Cascades** for car detection, a classic and fast machine learning-based technique used in OpenCV to identify objects in an image. 2.  **Plate Recognition:** Once a vehicle is found, the system hunts for the number plate. The project's "secret weapon" is its integration of **OpenAlpr**, a powerful, open-source ANPR library. OpenAlpr is specifically trained to find the rectangular region of a license plate and then perform Optical Character Recognition (OCR) to read the letters and numbers.
3.  **Logging:** As the name "logger" implies, the system isn't just for show. It's designed to take the recognized plate text and save it, creating a log of all vehicles that pass by the camera.


<div style="width:100%; max-width:900px; margin:auto;">
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>ANPR Process Flow</title>
  <style>
    :root {
      --bg-color: #0f172a;
      --box-fill: #1e293b;
      --box-stroke: #3b82f6; /* Bright Blue */
      --text-main: #f8fafc;
      --text-sub: #cbd5e1;
      --accent: #60a5fa;
    }
    .chart-container {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      color: var(--text-main);
    }
    .chart-title {
      text-align: center;
      margin-bottom: 30px;
      font-size: 24px;
      font-weight: 600;
      color: var(--accent);
      letter-spacing: 0.5px;
    }
    svg {
      width: 100%;
      height: auto;
      display: block;
      overflow: visible;
    }
    /* SVG Styles */
    .node-rect {
      fill: var(--box-fill);
      stroke: var(--box-stroke);
      stroke-width: 2px;
      rx: 8px; /* Rounded corners */
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
      transition: all 0.3s ease;
    }
    .node-header {
      font-size: 16px;
      font-weight: 700;
      fill: var(--text-main);
    }
    .node-desc {
      font-size: 13px;
      font-weight: 400;
      fill: var(--text-sub);
    }
    .edge-path {
      fill: none;
      stroke: #64748b;
      stroke-width: 2.5px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .edge-arrow {
      fill: #64748b;
    }
    /* Hover effect */
    .node-group:hover .node-rect {
      stroke: var(--accent);
      filter: drop-shadow(0 8px 15px rgba(59, 130, 246, 0.25));
    }
  </style>
</head>
<body>

<div class="chart-container">
  <div class="chart-title">Vehicle Logger: ANPR Logic Flow</div>
  
  <svg viewBox="0 0 850 480" preserveAspectRatio="xMidYMid meet">
    <defs>
      <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
        <path d="M2,2 L10,6 L2,10" class="edge-arrow" />
      </marker>
    </defs>

    <g class="node-group" transform="translate(20, 40)">
      <rect class="node-rect" width="220" height="90"></rect>
      <text x="20" y="35" class="node-header">1. Input Source</text>
      <text x="20" y="60" class="node-desc">Load Image or Video</text>
      <text x="20" y="78" class="node-desc" style="fill:#60a5fa; font-size:11px;">(OpenCV VideoCapture)</text>
    </g>

    <g class="node-group" transform="translate(300, 40)">
      <rect class="node-rect" width="220" height="90"></rect>
      <text x="20" y="35" class="node-header">2. Vehicle Detection</text>
      <text x="20" y="60" class="node-desc">Locate car in frame</text>
      <text x="20" y="78" class="node-desc" style="fill:#60a5fa; font-size:11px;">(Haar Cascade Classifier)</text>
    </g>

    <g class="node-group" transform="translate(580, 40)">
      <rect class="node-rect" width="240" height="90"></rect>
      <text x="20" y="35" class="node-header">3. Plate Localization</text>
      <text x="20" y="60" class="node-desc">Identify plate Region (ROI)</text>
      <text x="20" y="78" class="node-desc" style="fill:#60a5fa; font-size:11px;">(OpenALPR Integration)</text>
    </g>

    <g class="node-group" transform="translate(580, 220)">
      <rect class="node-rect" width="240" height="90"></rect>
      <text x="20" y="35" class="node-header">4. Recognition (OCR)</text>
      <text x="20" y="60" class="node-desc">Convert image pixels to text</text>
      <text x="20" y="78" class="node-desc" style="fill:#60a5fa; font-size:11px;">(Returns String + Confidence)</text>
    </g>

    <g class="node-group" transform="translate(300, 220)">
      <rect class="node-rect" width="220" height="90"></rect>
      <text x="20" y="35" class="node-header">5. Data Logging</text>
      <text x="20" y="60" class="node-desc">Save Plate # + Timestamp</text>
      <text x="20" y="78" class="node-desc" style="fill:#60a5fa; font-size:11px;">(CSV / Database)</text>
    </g>

    <g class="node-group" transform="translate(20, 220)">
      <rect class="node-rect" width="220" height="90"></rect>
      <text x="20" y="35" class="node-header">6. User Interface</text>
      <text x="20" y="60" class="node-desc">Display Result to User</text>
      <text x="20" y="78" class="node-desc" style="fill:#60a5fa; font-size:11px;">(PyQT / Flask)</text>
    </g>


    <path d="M240 85 L300 85" class="edge-path" marker-end="url(#arrow)" />
    
    <path d="M520 85 L580 85" class="edge-path" marker-end="url(#arrow)" />

    <path d="M700 130 L700 220" class="edge-path" marker-end="url(#arrow)" />

    <path d="M580 265 L520 265" class="edge-path" marker-end="url(#arrow)" />

    <path d="M300 265 L240 265" class="edge-path" marker-end="url(#arrow)" />

    <path d="M130 310 L130 360" class="edge-path" />
    <circle cx="130" cy="365" r="5" fill="#60a5fa" />
    <text x="145" y="370" fill="#cbd5e1" font-size="14">End of Pipeline</text>

  </svg>
</div>

</body>
</html>
</div>



### A Full Application, Not Just a Script

One of the most impressive parts of this repository is that it provides a complete user interface. The `QT` folder contains a "complete" desktop application, likely built with **PyQt**. This allows a user to:

* Load a test image or video file.
* Run the detection and recognition process.
* See the detected plate and the recognized text right in the app.

The project also contains an "incomplete" `WebApp` folder using **Flask**, showing an ambition to turn this tool into a web-based service, which could be used for a remote parking management system.

### A Look at the "Classic" vs. "Modern" Approach

This project is a fantastic example of a "classic" computer vision stack: **Python** glues everything together, **OpenCV** handles the image pre-processing and object detection (via Haar Cascades), and a specialized library (**OpenAlpr**) handles the core ANPR task.

The author also shows great foresight in the `README.md` by noting "Future improvements," which include the "Use of Neural Networks for OCR and Car detection." This is a perfect summary of how the field has evolved. While Haar Cascades and OpenAlpr are effective, modern systems often use deep learning models (like YOLO for detection and custom CNNs/LSTMs for OCR) to achieve even higher accuracy.

For anyone looking to understand how an end-to-end computer vision application is built—from the core logic to the user interface—this repository is an excellent and practical resource.

**[Check it out on GitHub here!](https://github.com/chrissunny94/Vehicle_Number_plate_logger_Python)**