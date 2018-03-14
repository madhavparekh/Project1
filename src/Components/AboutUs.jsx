import React from "react";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import ActionHome from "material-ui/svg-icons/action/home";
import Paper from "material-ui/Paper";

const AboutUsIcon = () => (
  <div>
    <Paper zDepth={1}>
      <IconButton
        tooltip={
          <div style={{ width: 250, whiteSpace: "normal", textAlign: "left" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vitae dolor ante. Nulla rutrum nulla at arcu luctus, hendrerit
            elementum nibh dignissim. Duis et dignissim quam. Suspendisse at
            finibus enim. Nulla quis eros pulvinar nulla tincidunt ultrices sed
            ac lectus. Suspendisse scelerisque volutpat neque. Integer elementum
            nunc nec luctus ornare.
          </div>
        }
        tooltipPosition="top-center"
      >
        <FontIcon className="material-icons">
          <div style={{ fontSize: 20, textInline: "left" }}>About Us</div>
        </FontIcon>
      </IconButton>
    </Paper>
  </div>
);

export default AboutUsIcon;
