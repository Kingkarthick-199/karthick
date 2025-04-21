document.addEventListener('DOMContentLoaded', () => {
  // Load certificates
  const gallery = document.getElementById('certificates-gallery');
  for (let i = 1; i <= 8; i++) {
    const img = document.createElement('img');
    img.src = `certificates/cert${i}.jpg`;
    img.alt = `Certificate ${i}`;
    img.style.borderRadius = '10px';
    img.style.width = '700px';
    img.style.height = '500px';
    img.style.objectFit = 'cover';
    img.style.margin = '10px';
    gallery.appendChild(img);
  }

  // Check if resume exists in localStorage
  const resumeLink = document.getElementById("resumeDownloadLink");
  const storedResume = localStorage.getItem("uploadedResume");
  if (storedResume) {
    resumeLink.href = storedResume;
    resumeLink.download = "Resume.pdf";
    resumeLink.style.display = "inline-block";
  }
});

// Upload and Store Resume
document.getElementById("resumeUpload").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const status = document.getElementById("uploadStatus");
  const resumeLink = document.getElementById("resumeDownloadLink");

  if (file && file.type === "application/pdf") {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64PDF = e.target.result;
      localStorage.setItem("uploadedResume", base64PDF); // Store in localStorage

      resumeLink.href = base64PDF;
      resumeLink.download = file.name;
      resumeLink.style.display = "inline-block";

      status.textContent = "Resume uploaded and saved!";
      status.style.color = "green";
    };
    reader.readAsDataURL(file);
  } else {
    status.textContent = "Please upload a valid PDF file.";
    status.style.color = "red";
    resumeLink.style.display = "none";
  }
});
