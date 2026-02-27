import React from 'react';
import pic2 from '../img/pic2.jpg';
import pic6 from '../img/pic6.jpg';
import pic7 from '../img/pic7.jpg';
import pic10 from '../img/pic10.jpg';
import pic4 from '../img/pic4.jpg';
import pic5 from '../img/pic5.jpg';
import pic3 from '../img/pic3.jpg'; 
import pic11 from '../img/pic11.jpg'; 
function Home() {
  return (
    <div className="home-page">
      {/* Hero Section / Slider */}
      <section id="home" className="hero-slider">
        <div className="container">
          <div className="slider-content">
            <div className="slide active">
              <div className="slide-caption">
                <h3>Let's make your life happier</h3>
                <h1>Healthy Living</h1>
                <a href="#team" className="btn-primary">Meet Our Doctors</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Welcome to Your Health Center</h2>
              <p>We are committed to providing quality, accessible, and efficient healthcare services to our patients. Our center is designed to ensure comfort, safety, and timely medical attention.</p>
              <p>Through our modern queue management system, patients can register, track their position, and receive services without unnecessary delays. Your health and well-being are our top priority.</p>
              
              <div className="profile-card">
                <img src={pic2}/>
                <div className="profile-info">
                  <h3>Dr. Neil Jackson</h3>
                  <p>General Principal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Doctors</h2>
          </div>

          <div className="team-grid">
            <div className="team-card">
               <img src={pic2}/>
              <div className="team-info">
                <h3>Nate Baston</h3>
                <p>General Principal</p>
                <div className="contact-details">
                  <p><i className="fa fa-phone"></i> 010-020-0120</p>
                  <p><i className="fa fa-envelope-o"></i> <a href="mailto:general@company.com">general@company.com</a></p>
                </div>
                <ul className="social-links">
                  <li><a href="#" className="fa fa-linkedin-square"></a></li>
                  <li><a href="#" className="fa fa-envelope-o"></a></li>
                </ul>
              </div>
            </div>

            <div className="team-card">
              <img src={pic6}/>
              <div className="team-info">
                <h3>Jason Stewart</h3>
                <p>Pregnancy</p>
                <div className="contact-details">
                  <p><i className="fa fa-phone"></i> 010-070-0170</p>
                  <p><i className="fa fa-envelope-o"></i> <a href="mailto:pregnancy@company.com">pregnancy@company.com</a></p>
                </div>
                <ul className="social-links">
                  <li><a href="#" className="fa fa-facebook-square"></a></li>
                  <li><a href="#" className="fa fa-envelope-o"></a></li>
                  <li><a href="#" className="fa fa-flickr"></a></li>
                </ul>
              </div>
            </div>

            <div className="team-card">
               <img src={pic7}/>
              <div className="team-info">
                <h3>Miasha Nakahara</h3>
                <p>Cardiology</p>
                <div className="contact-details">
                  <p><i className="fa fa-phone"></i> 010-040-0140</p>
                  <p><i className="fa fa-envelope-o"></i> <a href="mailto:cardio@company.com">cardio@company.com</a></p>
                </div>
                <ul className="social-links">
                  <li><a href="#" className="fa fa-twitter"></a></li>
                  <li><a href="#" className="fa fa-envelope-o"></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="news-section">
        <div className="container">
          <div className="section-header">
            <h2>Latest News</h2>
          </div>

          <div className="news-grid">
            <div className="news-card">
              <a href="news-detail.html">
                <img src={pic10}/>
              </a>
              <div className="news-content">
                <span className="news-date">March 08, 2018</span>
                <h3><a href="news-detail.html">About Amazing Technology</a></h3>
                <p>Amazing Technology is a forward-thinking company dedicated to developing innovative digital solutions that improve efficiency and user experience. We specialize in building reliable systems, including healthcare management platforms, that streamline operations and enhance service delivery.</p>
                <div className="author-info">
                   <img src={pic2}/>
                  <div>
                    <h5>Jeremie Carlson</h5>
                    <p>CEO / Founder</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="news-card">
              <a href="news-detail.html">
                <img src={pic4}/>
              </a>
              <div className="news-content">
                <span className="news-date">February 20, 2018</span>
                <h3><a href="news-detail.html">Introducing a new healing process</a></h3>
                <p>We are proud to introduce an innovative healing approach designed to improve patient recovery and overall well-being. This new process combines modern medical technology with personalized care to ensure faster diagnosis, effective treatment, and continuous monitoring.</p>
                <div className="author-info">
                  <img src={pic11}/>
                  <div>
                    <h5>Jason Stewart</h5>
                    <p>General Director</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="news-card">
              <a href="news-detail.html">
                 <img src={pic5}/>
              </a>
              <div className="news-content">
                <span className="news-date">January 27, 2018</span>
                <h3><a href="news-detail.html">Review Annual Medical Research</a></h3>
                <p>Each year, our medical team conducts and evaluates comprehensive research to improve treatment methods, patient care standards, and healthcare technologies.</p>
                <div className="author-info">
                      <img src={pic3}/>
                  <div>
                    <h5>Andrio Abero</h5>
                    <p>Online Advertising</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      
    </div>
  );
}

export default Home;