import React from 'react';

export const Footer = () => (
    <div id="footer">
      <div>
        <h1>shinyday</h1>
        <span>Inspired by <a href="https://bandcamp.com/">Bandcamp</a></span>
      </div>
      <p>
        <span><i className="fa fa-code" /> by <a href="https://cathimn.github.io/">Cath Lee</a></span><br />
        <span><a href="https://github.com/cathimn"><i className="fa fa-github-alt" /> GitHub</a></span><br />
        <span><a href="https://www.linkedin.com/in/cath-lee/"><i className="fa fa-linkedin" /> LinkedIn</a></span><br />
      </p>
      <p style={{ textAlign: "right" }}>
        <span>Images from <a href="https://www.rawpixel.com/category/53/public-domain">rawpixel</a></span><br/>
        <span>Music from <a href="https://freemusicarchive.org/">Free Music Archive</a></span><br/>
        <span>Logo by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a></span>
      </p>
    </div>
);

export const MiniFooter = () => (
  <div id="mini-footer">
    <div>
      <div>
        <h3>shinyday</h3>
        <span>inspired by bandcamp</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", columnGap: "15px", fontSize: "20px" }}>
        <a href="https://github.com/cathimn/shinyday"><i className="fa fa-github" /></a>
        <a href="https://www.linkedin.com/in/cath-lee/"><i className="fa fa-linkedin-square" /></a>
        <a href="https://angel.co/u/cathimn"><i className="fa fa-angellist" /></a>
      </div>
    </div>
    
  </div>
);
