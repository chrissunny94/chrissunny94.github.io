## Automatic Number Plate Recognition in Python: A Look at the "Vehicle Logger" Project

Automatic Number Plate Recognition (ANPR) is one of the most fascinating and practical applications of computer vision. You see it everywhere: in parking garages, on toll roads, and for security monitoring. It’s the magic that allows a camera to identify a vehicle just by its license plate.

If you've ever wanted to build such a system, a great place to start is the **[Vehicle\_Number\_plate\_logger\_Python](https://github.com/chrissunny94/Vehicle_Number_plate_logger_Python)** repository on GitHub. This project by Chris Sunny isn't just a simple script; it's a comprehensive toolkit for detecting, recognizing, and logging license plates, all built with Python.


<iframe width="560" height="315" src="https://www.youtube.com/embed/BoUYBXSpq1c" frameborder="0" allowfullscreen></iframe>

### How It Works: The ANPR Pipeline

The project cleverly combines several key technologies to create a complete pipeline:

1.  **Vehicle Detection:** Before you can find a *plate*, you usually need to find the *car*. The repository includes **Haar Cascades** for car detection, a classic and fast machine learning-based technique used in OpenCV to identify objects in an image. 2.  **Plate Recognition:** Once a vehicle is found, the system hunts for the number plate. The project's "secret weapon" is its integration of **OpenAlpr**, a powerful, open-source ANPR library. OpenAlpr is specifically trained to find the rectangular region of a license plate and then perform Optical Character Recognition (OCR) to read the letters and numbers.
3.  **Logging:** As the name "logger" implies, the system isn't just for show. It's designed to take the recognized plate text and save it, creating a log of all vehicles that pass by the camera.

<div style="width:100%; max-width:1100px; margin:auto;">
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>ANPR Pipeline Flowchart</title>
  <style>
    :root{
      --bg:#0f1724; --card:#0b1220; --accent:#60a5fa; --muted:#94a3b8; --glass: rgba(255,255,255,0.03);
      --w:320px; --h:76px;
      font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    }
    body{margin:0;background:linear-gradient(180deg,#061021 0%, #071428 100%);color:#e6eef8;display:flex;align-items:center;justify-content:center;min-height:100vh}
    .canvas{width:100%;max-width:1100px;padding:28px}
    .header{display:flex;align-items:center;gap:16px;margin-bottom:22px}
    .logo{width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#8b5cf6);display:flex;align-items:center;justify-content:center;font-weight:700;color:#041025}
    h1{margin:0;font-size:18px}
    p.sub{margin:0;color:var(--muted);font-size:13px}

    /* Flow area */
    .flow{background:var(--glass);border-radius:14px;padding:28px;box-shadow:0 6px 22px rgba(2,6,23,0.6)}
    svg{width:100%;height:auto;display:block}

    .node{fill:transparent;stroke:rgba(255,255,255,0.06);stroke-width:1;rx:12;}
    .node-bg{fill:#071428;stroke:none}
    .label{font-size:14px;fill:#e6eef8}
    .desc{font-size:12px;fill:var(--muted)}

    .chip{font-size:11px;fill:#041025}
    .chip-rect{rx:10}

    .arrow{stroke:rgba(150,180,255,0.12);stroke-width:2;marker-end:url(#arrowhead)}

    /* Hover effects */
    .group:hover .node-bg{filter: drop-shadow(0 8px 18px rgba(96,165,250,0.12));}
    .group:hover .label{fill:var(--accent)}

    /* small screen */
    @media (max-width:760px){
      :root{--w:260px}
      .canvas{padding:12px}
    }

    .legend{display:flex;gap:12px;align-items:center;margin-top:18px}
    .legend .item{display:flex;gap:8px;align-items:center;font-size:13px;color:var(--muted)}
    .legend .sw{width:18px;height:12px;border-radius:4px;background:var(--accent)}

  </style>
</head>
<body>
  <div class="canvas">
    <div class="header">
      <div class="logo">ANPR</div>
      <div>
        <h1>ANPR Pipeline — Visual Flowchart</h1>
        <p class="sub">From camera feed to logged plate text — Vehicle detection, plate recognition (OpenAlpr), OCR & logging.</p>
      </div>
    </div>

    <div class="flow">
      <!-- SVG flowchart -->
      <svg viewBox="0 0 1100 420" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9fb7ff" opacity="0.9"/>
          </marker>
        </defs>

        <!-- Camera Input -->
        <g class="group" transform="translate(20,30)">
          <rect class="node-bg" x="0" y="0" width="220" height="76" rx="12"></rect>
          <rect class="node" x="0" y="0" width="220" height="76" rx="12"></rect>
          <text class="label" x="18" y="28">Camera / Video Feed</text>
          <text class="desc" x="18" y="50">Live camera or recorded video input</text>
          <rect x="150" y="44" width="60" height="20" fill="#60a5fa" rx="8" class="chip-rect"></rect>
          <text class="chip" x="174" y="58">Input</text>
        </g>

        <!-- Preprocessing -->
        <g class="group" transform="translate(260,30)">
          <rect class="node-bg" x="0" y="0" width="220" height="76" rx="12"></rect>
          <rect class="node" x="0" y="0" width="220" height="76" rx="12"></rect>
          <text class="label" x="18" y="28">Preprocessing</text>
          <text class="desc" x="18" y="50">Resize, denoise, color adjust</text>
          <rect x="150" y="44" width="60" height="20" fill="#60a5fa" rx="8" class="chip-rect"></rect>
          <text class="chip" x="168" y="58">BGR/MONO</text>
        </g>

        <!-- Vehicle Detection -->
        <g class="group" transform="translate(500,30)">
          <rect class="node-bg" x="0" y="0" width="260" height="76" rx="12"></rect>
          <rect class="node" x="0" y="0" width="260" height="76" rx="12"></rect>
          <text class="label" x="18" y="26">Vehicle Detection</text>
          <text class="desc" x="18" y="46">Haar Cascades (OpenCV) — find vehicle bounding boxes</text>
          <rect x="180" y="44" width="66" height="20" fill="#60a5fa" rx="8" class="chip-rect"></rect>
          <text class="chip" x="200" y="58">BBox</text>
        </g>

        <!-- Plate Detection (OpenALPR) -->
        <g class="group" transform="translate(20,150)">
          <rect class="node-bg" x="0" y="0" width="420" height="88" rx="12"></rect>
          <rect class="node" x="0" y="0" width="420" height="88" rx="12"></rect>
          <text class="label" x="18" y="30">Plate Detection</text>
          <text class="desc" x="18" y="52">OpenAlpr / ANPR module — detects license plate region (rectangular ROI)</text>
          <rect x="330" y="56" width="70" height="22" fill="#60a5fa" rx="10" class="chip-rect"></rect>
          <text class="chip" x="352" y="72">ROI</text>
        </g>

        <!-- OCR -->
        <g class="group" transform="translate(480,170)">
          <rect class="node-bg" x="0" y="0" width="260" height="76" rx="12"></rect>
          <rect class="node" x="0" y="0" width="260" height="76" rx="12"></rect>
          <text class="label" x="18" y="28">OCR</text>
          <text class="desc" x="18" y="50">Optical character recognition on plate ROI — returns text + confidence</text>
          <rect x="190" y="44" width="62" height="20" fill="#60a5fa" rx="8" class="chip-rect"></rect>
          <text class="chip" x="214" y="58">Text</text>
        </g>

        <!-- Logging -->
        <g class="group" transform="translate(760,170)">
          <rect class="node-bg" x="0" y="0" width="260" height="76" rx="12"></rect>
          <rect class="node" x="0" y="0" width="260" height="76" rx="12"></rect>
          <text class="label" x="18" y="28">Logging & Storage</text>
          <text class="desc" x="18" y="50">Save plate text, timestamp, image snapshot (CSV / DB / JSON)</text>
          <rect x="180" y="44" width="70" height="20" fill="#60a5fa" rx="8" class="chip-rect"></rect>
          <text class="chip" x="202" y="58">DB / CSV</text>
        </g>

        <!-- UI / Dashboard -->
        <g class="group" transform="translate(480,270)">
          <rect class="node-bg" x="0" y="0" width="540" height="76" rx="12"></rect>
          <rect class="node" x="0" y="0" width="540" height="76" rx="12"></rect>
          <text class="label" x="18" y="28">Dashboard / Logger UI</text>
          <text class="desc" x="18" y="50">Search, filter, view plate images and timestamps</text>
          <rect x="420" y="44" width="92" height="20" fill="#60a5fa" rx="8" class="chip-rect"></rect>
          <text class="chip" x="440" y="58">Review</text>
        </g>

        <!-- Arrows -->
        <path class="arrow" d="M240 68 L260 68" marker-end="url(#arrowhead)" />
        <path class="arrow" d="M480 68 L500 68" marker-end="url(#arrowhead)" />
        <path class="arrow" d="M160 118 L160 150" marker-end="url(#arrowhead)" />
        <path class="arrow" d="M620 118 L340 160" marker-end="url(#arrowhead)" />

        <path class="arrow" d="M580 160 L580 170" marker-end="url(#arrowhead)" />
        <path class="arrow" d="M740 200 L760 200" marker-end="url(#arrowhead)" />
        <path class="arrow" d="M640 240 L640 270" marker-end="url(#arrowhead)" />

        <path class="arrow" d="M820 210 L820 270" marker-end="url(#arrowhead)" />
        <path class="arrow" d="M600 320 L480 320" marker-end="url(#arrowhead)" />

      </svg>

      <div class="legend">
        <div class="item"><span class="sw"></span>Pipeline step</div>
        <div class="item"><svg width="14" height="14"><rect width="14" height="14" rx="3" fill="#60a5fa"></rect></svg>Quick metadata</div>
      </div>

    </div>
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