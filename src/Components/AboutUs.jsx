import React from "react";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import ActionHome from "material-ui/svg-icons/action/home";

const AboutUsIcon = () => (
  <div>
    <IconButton
      tooltip={
        <div style={{ width: 250, whiteSpace: 'normal', textAlign: 'left' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae dolor ante. Nulla rutrum nulla at arcu luctus, hendrerit elementum nibh dignissim. Duis et dignissim quam. Suspendisse at finibus enim. Nulla quis eros pulvinar nulla tincidunt ultrices sed ac lectus. Suspendisse scelerisque volutpat neque. Integer elementum nunc nec luctus ornare.
        </div>
      }
      tooltipPosition="top-center">

      <FontIcon
        className="material-icons">
        <div style={{fontSize: 20, textInline: 'left'}}>
          About Us
        </div>
      </FontIcon>
    </IconButton>
  </div>
);

export default AboutUsIcon;
