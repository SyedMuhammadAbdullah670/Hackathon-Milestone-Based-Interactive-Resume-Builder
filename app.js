// Form and Output Elements
var resumeForm = document.getElementById("resume-form");
var resumeOutput = document.getElementById("resume-output");
var nameOutput = document.getElementById("name-output");
var emailOutput = document.getElementById("email-output");
var profilePicOutput = document.getElementById("profile-pic-output");
var educationOutput = document.getElementById("education-output");
var institutionOutput = document.getElementById("institution-output");
var workExperienceOutput = document.getElementById("work-experience-output");
var skillsOutput = document.getElementById("skills-output");
var editResumeBtn = document.getElementById("edit-resume-btn");
var savePdfBtn = document.getElementById("save-pdf-btn");
var shareLinkBtn = document.getElementById("share-link-btn");
// Drag-and-Drop Elements
var profileDropArea = document.getElementById("profile-drop-area");
var profilePicUpload = document.getElementById("profile-pic-upload");
var addWorkExperienceBtn = document.getElementById("add-work-experience-btn");
var workExperienceContainer = document.getElementById("work-experience-container");
// Function to handle image upload
function handleImageUpload(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        profilePicOutput.src = result; // Set the result as profile picture
    };
    reader.readAsDataURL(file);
}
// Event listeners for drag-and-drop
profileDropArea.addEventListener("dragover", function (event) {
    event.preventDefault();
    profileDropArea.classList.add("dragover");
});
profileDropArea.addEventListener("dragleave", function () {
    profileDropArea.classList.remove("dragover");
});
profileDropArea.addEventListener("drop", function (event) {
    var _a;
    event.preventDefault();
    profileDropArea.classList.remove("dragover");
    var files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
    if (files && files.length > 0) {
        handleImageUpload(files[0]); // Process only the first file
    }
});
// Clicking the drop area to trigger file input
profileDropArea.addEventListener("click", function () {
    profilePicUpload.click();
});
profilePicUpload.addEventListener("change", function () {
    var files = profilePicUpload.files;
    if (files && files.length > 0) {
        handleImageUpload(files[0]); // Process only the first file
    }
});
// Handle Add More Work Experience
addWorkExperienceBtn.addEventListener("click", function () {
    var workExperienceGroup = document.createElement("div");
    workExperienceGroup.classList.add("work-experience-group");
    workExperienceGroup.innerHTML = "\n        <label for=\"work-position\">Position:</label>\n        <input type=\"text\" required>\n        <label for=\"work-company\">Company:</label>\n        <input type=\"text\" required>\n        <label for=\"work-duration\">Duration (years):</label>\n        <input type=\"number\" required min=\"0\" step=\"1\">\n    ";
    workExperienceContainer.appendChild(workExperienceGroup);
});
// Function to handle skill tags
function updateSkills() {
    skillsOutput.innerHTML = "";
    var skills = document.getElementById("skills").value.split(",");
    skills.forEach(function (skill) {
        skill = skill.trim();
        if (skill) {
            var skillTag = document.createElement("div");
            skillTag.classList.add("skill-tag");
            skillTag.innerHTML = "".concat(skill, "<span class=\"remove-tag\" onclick=\"removeSkill(this)\">x</span>");
            skillsOutput.appendChild(skillTag);
        }
    });
}
// Handle Resume Form Submission
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Populate Resume with User Input
    nameOutput.textContent = document.getElementById("name").value;
    emailOutput.textContent = document.getElementById("email").value;
    educationOutput.textContent = document.getElementById("education").value;
    institutionOutput.textContent = document.getElementById("institution").value;
    // Work Experience Handling
    workExperienceOutput.innerHTML = "";
    var workExperiences = workExperienceContainer.querySelectorAll(".work-experience-group");
    workExperiences.forEach(function (workExperience) {
        var position = workExperience.querySelector('input[type="text"]').value;
        var company = workExperience.querySelector('input[type="text"]:nth-of-type(2)').value;
        var duration = workExperience.querySelector('input[type="number"]').value;
        var li = document.createElement("li");
        li.textContent = "".concat(position, " at ").concat(company, " (").concat(duration, " years)");
        workExperienceOutput.appendChild(li);
    });
    // Parse and Display Skills as Tags
    updateSkills();
    // Show Resume
    resumeOutput.style.display = "block";
    resumeForm.style.display = "none";
});
// Function to remove a skill tag
function removeSkill(element) {
    var _a;
    var skillTag = element.parentElement;
    (_a = skillTag === null || skillTag === void 0 ? void 0 : skillTag.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(skillTag);
}
// Handle Input Change for Skills
var skillsInput = document.getElementById("skills");
skillsInput.addEventListener("input", updateSkills);
// Download Resume as PDF
savePdfBtn.addEventListener("click", function () {
    var resumeContent = document.getElementById("resume-content");
    if (resumeContent) {
        var options = {
            margin: 1,
            filename: "resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        try {
        }
        catch (error) {
            console.error("Error generating PDF:", error);
        }
    }
    else {
        console.error("Resume content not found.");
    }
});
// Share Resume Link
shareLinkBtn.addEventListener("click", function () {
    // Generate a unique URL (for demonstration, using a static placeholder)
    var url = "".concat(window.location.origin, "/resume/").concat(document.getElementById("name").value
        .toLowerCase()
        .replace(/\s/g, "-"));
    prompt("Copy this link to share your resume:", url);
});
function html2pdf() {
    throw new Error("Function not implemented.");
}
