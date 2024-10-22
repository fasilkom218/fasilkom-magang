import React from "react";
import fasilkom from '../assets/img/fasilkom.png'

const Footer = () => {
  return (
    <section className="bg-[#151518]">
      <div className="container">
        <footer className="footer bg-base-200 text-white">
          <aside>
            <div className="w-36 h-36 bg-white rounded-lg p-2">
              <img src={fasilkom} alt="" className="w-full" />
            </div>
            <p>
              Fasilkom Unsika.
              <br />
              Copyright © 2024 - All right reserved
            </p>
          </aside>
          <nav>
            <h6 className="mb-2 font-bold uppercase">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="mb-2 font-bold uppercase">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="mb-2 font-bold uppercase">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
