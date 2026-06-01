import { useRef, useState } from "react";
import "../styles/CVPreview.css";

function getResponsibilityItems(responsibilities) {
  return responsibilities
    .split(/\n/)
    .map((responsibility) =>
      responsibility.replace(/^[-*\u2022]\s*/, "").trim(),
    )
    .filter(Boolean);
}

function getListItems(value) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getProjectHref(link) {
  if (!link) {
    return "";
  }

  if (/^https?:\/\//i.test(link)) {
    return link;
  }

  return `https://${link}`;
}

function getDisplayLink(link) {
  return link.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

function getPdfFilename(name) {
  const normalizedName = name
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return normalizedName ? `${normalizedName}-cv.pdf` : "cv.pdf";
}

export default function CVPreview({
  generalInfo,
  summaryInfo,
  skillsInfo,
  projectInfo,
  educationInfo,
  experienceInfo,
}) {
  const cvDocumentRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const skillItems = getListItems(skillsInfo.skills);
  const iconSprite = `${import.meta.env.BASE_URL}icons.svg`;
  const contactItems = [
    {
      icon: "mail-icon",
      label: generalInfo.email || "email@example.com",
      href: generalInfo.email ? `mailto:${generalInfo.email}` : "",
    },
    {
      icon: "phone-icon",
      label: generalInfo.phone || "Phone Number",
      href: generalInfo.phone
        ? `tel:${generalInfo.phone.replace(/[^\d+]/g, "")}`
        : "",
    },
    {
      icon: "location-icon",
      label: generalInfo.location || "Location",
      href: "",
    },
    ...(generalInfo.linkedin
      ? [
          {
            icon: "linkedin-icon",
            label: getDisplayLink(generalInfo.linkedin),
            href: getProjectHref(generalInfo.linkedin),
          },
        ]
      : []),
    ...(generalInfo.github
      ? [
          {
            icon: "github-icon",
            label: getDisplayLink(generalInfo.github),
            href: getProjectHref(generalInfo.github),
          },
        ]
      : []),
    ...(generalInfo.website
      ? [
          {
            icon: "website-icon",
            label: getDisplayLink(generalInfo.website),
            href: getProjectHref(generalInfo.website),
          },
        ]
      : []),
  ];

  async function handleDownload() {
    if (!cvDocumentRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(cvDocumentRef.current, {
        backgroundColor: "#ffffff",
        logging: false,
        scale: 2,
        useCORS: true,
      });
      const pdf = new jsPDF({
        format: "a4",
        orientation: "portrait",
        unit: "mm",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageHeight = (canvas.height * pageWidth) / canvas.width;
      const imageData = canvas.toDataURL("image/png");
      let remainingHeight = imageHeight;
      let imagePosition = 0;

      pdf.addImage(imageData, "PNG", 0, imagePosition, pageWidth, imageHeight);
      remainingHeight -= pageHeight;

      while (remainingHeight > 0) {
        imagePosition = remainingHeight - imageHeight;
        pdf.addPage();
        pdf.addImage(
          imageData,
          "PNG",
          0,
          imagePosition,
          pageWidth,
          imageHeight,
        );
        remainingHeight -= pageHeight;
      }

      pdf.save(getPdfFilename(generalInfo.name));
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <aside className="cv-preview">
      <div className="preview-heading">
        <div>
          <p>Live Preview</p>
          <span>A4 document view</span>
        </div>
        <button type="button" disabled={isDownloading} onClick={handleDownload}>
          {isDownloading ? "Preparing PDF..." : "Download CV"}
        </button>
      </div>

      <div className="cv-document" ref={cvDocumentRef}>
        <header className="cv-document-header">
          <h2>{generalInfo.name || "Your Name"}</h2>
          <ul className="cv-contact-list">
            {contactItems.map((item) => (
              <li key={`${item.label}-${item.href}`}>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <svg aria-hidden="true" className="cv-contact-icon">
                      <use href={`${iconSprite}#${item.icon}`} />
                    </svg>
                    {item.label}
                  </a>
                ) : (
                  <span>
                    <svg aria-hidden="true" className="cv-contact-icon">
                      <use href={`${iconSprite}#${item.icon}`} />
                    </svg>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </header>

        <section>
          <h3>Professional Summary</h3>
          <p>
            {summaryInfo.summary ||
              "A concise summary of your experience, strengths, and career focus."}
          </p>
        </section>

        <section>
          <h3>Skills</h3>
          <ul className="cv-skills">
            {(skillItems.length > 0
              ? skillItems
              : ["Core skill", "Technical skill", "Professional skill"]
            ).map((skill, index) => (
              <li key={`${skill}-${index}`}>{skill}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Projects</h3>
          {projectInfo.map((project, index) => {
            const technologyItems = getListItems(project.technologies);
            const projectLink = getProjectHref(project.link);

            return (
              <div className="cv-project" key={project.id}>
                <div className="cv-project-header">
                  <div>
                    <p>
                      <strong>
                        {project.name || `Project Name ${index + 1}`}
                      </strong>
                    </p>
                    <p>{project.description || "Project description"}</p>
                  </div>
                  {projectLink ? (
                    <a href={projectLink} target="_blank" rel="noreferrer">
                      View project
                    </a>
                  ) : (
                    <span>Project link</span>
                  )}
                </div>

                <ul className="cv-skills cv-project-tech">
                  {(technologyItems.length > 0
                    ? technologyItems
                    : ["Technology", "Tool", "Method"]
                  ).map((technology, technologyIndex) => (
                    <li key={`${technology}-${technologyIndex}`}>
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        <section>
          <h3>Education</h3>
          {educationInfo.map((education, index) => (
            <div className="cv-entry" key={education.id}>
              <div>
                <p>
                  <strong>
                    {education.school || `School Name ${index + 1}`}
                  </strong>
                </p>
                <p>{education.studyTitle || "Title of Study"}</p>
              </div>
              <p className="cv-date">
                {education.studyDate || "Date of Study"}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h3>Experience</h3>
          {experienceInfo.map((experience, index) => {
            const responsibilityItems = getResponsibilityItems(
              experience.responsibilities,
            );

            return (
              <div className="cv-preview-entry" key={experience.id}>
                <div className="cv-entry">
                  <div>
                    <p>
                      <strong>
                        {experience.company || `Company Name ${index + 1}`}
                      </strong>
                    </p>
                    <p>{experience.position || "Position Title"}</p>
                  </div>
                  <p className="cv-date">
                    {experience.startDate || "Start Date"} -{" "}
                    {experience.endDate || "End Date"}
                  </p>
                </div>
                <ul className="cv-responsibilities">
                  {(responsibilityItems.length > 0
                    ? responsibilityItems
                    : [
                        "Main responsibility",
                        "Measurable impact",
                        "Tools or methods used",
                      ]
                  ).map((responsibility, responsibilityIndex) => (
                    <li key={`${responsibility}-${responsibilityIndex}`}>
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </aside>
  );
}
