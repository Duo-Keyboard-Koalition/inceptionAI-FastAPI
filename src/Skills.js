function certification(cert_name, cert_date, cert_image) {
  return (
    <div class="col-md-3">
      <div class="skills_icon icon2 delay-03s animated wow zoomIn">
        <img src={cert_image} alt="${cert_name}" />
      </div>
      <div class="skills_block">
        <h3 class="animated fadeInUp wow">{cert_name}</h3>
        <p class="animated fadeInDown wow">
          {cert_date}
        </p>
      </div>
    </div>
  );
}
function Skills() {
  const certifications = [
    {
      name: 'AWS Certified Practitioner',
      date: '2 January 2021',
      image: 'img/aws-practitioner.png',
    },
    {
      name: 'AWS Certified Developer',
      date: '15 March 2021',
      image: 'img/aws-developer.png',
    },
    {
      name: 'AWS Certified Solutions Architect',
      date: '22 July 2021',
      image: 'img/aws-solutions-architect.png',
    },
    // Add more certifications here
  ];
  return (
    <section id="skills">
      <div class="container">
        <h2>Skills</h2>
        <h6>
          “The greatest scientific discovery was the discovery of ignorance.”-- Yuval Noah Harari, Homo Deus: A
          History of Tomorrow
        </h6>
        <div class="skills_wrapper">
          <div class="row">
            {certifications.map((cert, index) =>
              certification(cert.name, cert.date, cert.image)
            )}


          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
