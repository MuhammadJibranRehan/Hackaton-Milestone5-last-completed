var _a, _b, _c, _d;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // Prevent form submission
    // Collect form inputs
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var profilePictureElement = document.getElementById('profilePicture');
    var usernameElement = document.getElementById('username'); // New username input
    if (areFormElementsValid(nameElement, emailElement, phoneElement, educationElement, experienceElement, skillsElement)) {
        var name_1 = nameElement.value.trim();
        var email_1 = emailElement.value.trim();
        var phone_1 = phoneElement.value.trim();
        var education_1 = educationElement.value.trim();
        var experience_1 = experienceElement.value.trim();
        var skills_1 = skillsElement.value.trim();
        var username_1 = usernameElement.value.trim(); // Get the username
        var file = (_a = profilePictureElement.files) === null || _a === void 0 ? void 0 : _a[0];
        
        // Generate unique URL
        var uniqueUrl = `${username_1}.vercel.app/resume`;

        if (file) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                var profileImageSrc = reader_1.result ? `<img src="${reader_1.result}" alt="Profile Picture" class="profile-img" />` : '';
                generateResumeOutput(profileImageSrc, name_1, email_1, phone_1, education_1, experience_1, skills_1, uniqueUrl);
            };
            reader_1.readAsDataURL(file);
        } else {
            generateResumeOutput('', name_1, email_1, phone_1, education_1, experience_1, skills_1, uniqueUrl);
        }
    } else {
        console.error('One or more form elements are missing or invalid.');
    }
});

function areFormElementsValid() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    return elements.every(function (element) { return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement; });
}

function generateResumeOutput(profileImageSrc, name, email, phone, education, experience, skills, uniqueUrl) {
    var resumeOutput = `
      <div class="resume-header">
          ${profileImageSrc}
          <h1 contenteditable="true" class="editable">${name}</h1>
          <p><strong>Email:</strong> <span contenteditable="true" class="editable">${email}</span></p>
          <p><strong>Phone:</strong> <span contenteditable="true" class="editable">${phone}</span></p>
      </div>
      <h3>Education</h3>
      <p contenteditable="true" class="editable">${education}</p>
      <h3>Experience</h3>
      <p contenteditable="true" class="editable">${experience}</p>
      <h3>Skills</h3>
      <p contenteditable="true" class="editable">${skills}</p>
      <h3>Share Your Resume</h3>
      <p>Share this link: <a href="${uniqueUrl}" target="_blank">${uniqueUrl}</a></p>
    `;
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        // Make the editable fields focusable
        makeEditable();
    }
    // Show print and download buttons
    (_b = document.getElementById('printResume')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
    (_c = document.getElementById('downloadResume')) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
    // Optionally, implement PDF download
    (_d = document.getElementById('downloadResume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
        // Use jsPDF or another library to create a PDF
        downloadResumeAsPDF(
            document.querySelector('.editable').innerText,
            document.querySelector('.editable').nextElementSibling.innerText,
            document.querySelector('.editable').nextElementSibling.nextElementSibling.innerText,
            document.querySelector('.editable').nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            document.querySelector('.editable').nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            document.querySelector('.editable').nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText,
            profileImageSrc
        );
    });
}

function downloadResumeAsPDF(name, email, phone, education, experience, skills, profileImageSrc) {
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(name, 20, 20);
    doc.setFontSize(12);
    doc.text(`Email: ${email}`, 20, 30);
    doc.text(`Phone: ${phone}`, 20, 40);
    doc.text("Education:", 20, 50);
    doc.text(education, 20, 60);
    doc.text("Experience:", 20, 70);
    doc.text(experience, 20, 80);
    doc.text("Skills:", 20, 90);
    doc.text(skills, 20, 100);
    if (profileImageSrc) {
        // Use a method to add images to jsPDF if you want to include the profile picture
    }
    doc.save(`${name}_resume.pdf`);
}