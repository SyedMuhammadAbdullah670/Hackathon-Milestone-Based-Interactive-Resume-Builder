// Form and Output Elements
const resumeForm = document.getElementById("resume-form") as HTMLFormElement;
const resumeOutput = document.getElementById("resume-output") as HTMLElement;
const nameOutput = document.getElementById("name-output") as HTMLElement;
const emailOutput = document.getElementById("email-output") as HTMLElement;
const profilePicOutput = document.getElementById(
  "profile-pic-output"
) as HTMLImageElement;
const educationOutput = document.getElementById(
  "education-output"
) as HTMLElement;
const institutionOutput = document.getElementById(
  "institution-output"
) as HTMLElement;
const workExperienceOutput = document.getElementById(
  "work-experience-output"
) as HTMLUListElement;
const skillsOutput = document.getElementById("skills-output") as HTMLElement;
const editResumeBtn = document.getElementById(
  "edit-resume-btn"
) as HTMLButtonElement;
const savePdfBtn = document.getElementById("save-pdf-btn") as HTMLButtonElement;
const shareLinkBtn = document.getElementById(
  "share-link-btn"
) as HTMLButtonElement;

// Drag-and-Drop Elements
const profileDropArea = document.getElementById(
  "profile-drop-area"
) as HTMLDivElement;
const profilePicUpload = document.getElementById(
  "profile-pic-upload"
) as HTMLInputElement;
const addWorkExperienceBtn = document.getElementById(
  "add-work-experience-btn"
) as HTMLButtonElement;
const workExperienceContainer = document.getElementById(
  "work-experience-container"
) as HTMLElement;

// Function to handle image upload
function handleImageUpload(file: File) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const result = e.target?.result as string;
    profilePicOutput.src = result; // Set the result as profile picture
  };
  reader.readAsDataURL(file);
}

// Event listeners for drag-and-drop
profileDropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  profileDropArea.classList.add("dragover");
});

profileDropArea.addEventListener("dragleave", () => {
  profileDropArea.classList.remove("dragover");
});

profileDropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  profileDropArea.classList.remove("dragover");
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    handleImageUpload(files[0]); // Process only the first file
  }
});

// Clicking the drop area to trigger file input
profileDropArea.addEventListener("click", () => {
  profilePicUpload.click();
});

profilePicUpload.addEventListener("change", () => {
  const files = profilePicUpload.files;
  if (files && files.length > 0) {
    handleImageUpload(files[0]); // Process only the first file
  }
});

// Handle Add More Work Experience
addWorkExperienceBtn.addEventListener("click", () => {
  const workExperienceGroup = document.createElement("div");
  workExperienceGroup.classList.add("work-experience-group");

  workExperienceGroup.innerHTML = `
        <label for="work-position">Position:</label>
        <input type="text" required>
        <label for="work-company">Company:</label>
        <input type="text" required>
        <label for="work-duration">Duration (years):</label>
        <input type="number" required min="0" step="1">
    `;

  workExperienceContainer.appendChild(workExperienceGroup);
});

// Function to handle skill tags
function updateSkills() {
  skillsOutput.innerHTML = "";
  const skills = (
    document.getElementById("skills") as HTMLInputElement
  ).value.split(",");
  skills.forEach((skill) => {
    skill = skill.trim();
    if (skill) {
      const skillTag = document.createElement("div");
      skillTag.classList.add("skill-tag");
      skillTag.innerHTML = `${skill}<span class="remove-tag" onclick="removeSkill(this)">x</span>`;
      skillsOutput.appendChild(skillTag);
    }
  });
}

// Handle Resume Form Submission
resumeForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  // Populate Resume with User Input
  nameOutput.textContent = (
    document.getElementById("name") as HTMLInputElement
  ).value;
  emailOutput.textContent = (
    document.getElementById("email") as HTMLInputElement
  ).value;
  educationOutput.textContent = (
    document.getElementById("education") as HTMLInputElement
  ).value;
  institutionOutput.textContent = (
    document.getElementById("institution") as HTMLInputElement
  ).value;

  // Work Experience Handling
  workExperienceOutput.innerHTML = "";
  const workExperiences = workExperienceContainer.querySelectorAll(
    ".work-experience-group"
  );
  workExperiences.forEach((workExperience) => {
    const position = (
      workExperience.querySelector('input[type="text"]') as HTMLInputElement
    ).value;
    const company = (
      workExperience.querySelector(
        'input[type="text"]:nth-of-type(2)'
      ) as HTMLInputElement
    ).value;
    const duration = (
      workExperience.querySelector('input[type="number"]') as HTMLInputElement
    ).value;

    const li = document.createElement("li");
    li.textContent = `${position} at ${company} (${duration} years)`;
    workExperienceOutput.appendChild(li);
  });

  // Parse and Display Skills as Tags
  updateSkills();

  // Show Resume
  resumeOutput.style.display = "block";
  resumeForm.style.display = "none";
});

// Function to remove a skill tag
function removeSkill(element: HTMLElement) {
  const skillTag = element.parentElement;
  skillTag?.parentElement?.removeChild(skillTag);
}

// Handle Input Change for Skills
const skillsInput = document.getElementById("skills") as HTMLInputElement;
skillsInput.addEventListener("input", updateSkills);



// Download Resume as PDF

   
savePdfBtn.addEventListener("click", () => {
  const resumeContent = document.getElementById(
    "resume-content"
  ) as HTMLElement;

  if (resumeContent) {
    const options = {
      margin: 1,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    try {
     
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  } else {
    console.error("Resume content not found.");
  }
});

// Share Resume Link
shareLinkBtn.addEventListener("click", () => {
  // Generate a unique URL (for demonstration, using a static placeholder)
  const url = `${window.location.origin}/resume/${(
    document.getElementById("name") as HTMLInputElement
  ).value
    .toLowerCase()
    .replace(/\s/g, "-")}`;
  prompt("Copy this link to share your resume:", url);
});
function html2pdf() {
  throw new Error("Function not implemented.");
}
