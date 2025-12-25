import { createGlobalStyle } from 'styled-components';

// Images
import iconsEot from 'images/semantic-icons/icons.eot';
import iconsWoff2 from 'images/semantic-icons/icons.woff2';
import iconsWoff from 'images/semantic-icons/icons.woff';
import iconsTtf from 'images/semantic-icons/icons.ttf';
import iconsSvg from 'images/semantic-icons/icons.svg';
import brandIconsEot from 'images/semantic-icons/brand-icons.eot';
import brandIconsWoff2 from 'images/semantic-icons/brand-icons.woff2';
import brandIconsWoff from 'images/semantic-icons/brand-icons.woff';
import brandIconsTtf from 'images/semantic-icons/brand-icons.ttf';
import brandIconsSvg from 'images/semantic-icons/brand-icons.svg';
import outlineIconsEot from 'images/semantic-icons/outline-icons.eot';
import outlineIconsWoff2 from 'images/semantic-icons/outline-icons.woff2';
import outlineIconsWoff from 'images/semantic-icons/outline-icons.woff';
import outlineIconsTtf from 'images/semantic-icons/outline-icons.ttf';
import outlineIconsSvg from 'images/semantic-icons/outline-icons.svg';

const animations = () => `
  @-webkit-keyframes shimmer {
    0% {
      background-position: top left;
    }
    100% {
      background-position: top right;
    }
  }`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Icons;
    src: url(${iconsEot});
    src: url(${iconsEot}#iefix)
        format('embedded-opentype'),
      url(${iconsWoff2}) format('woff2'),
      url(${iconsWoff}) format('woff'),
      url(${iconsTtf}) format('truetype'),
      url(${iconsSvg}#icons) format('svg');
  }

  @font-face {
    font-family: brand-icons;
    src: url(${brandIconsEot});
    src: url(${brandIconsEot}#iefix)
        format('embedded-opentype'),
      url(${brandIconsWoff2}) format('woff2'),
      url(${brandIconsWoff}) format('woff'),
      url(${brandIconsTtf}) format('truetype'),
      url(${brandIconsSvg}#icons) format('svg');
  }

  @font-face {
    font-family: outline-icons;
    src: url(${outlineIconsEot});
    src: url(${outlineIconsEot}#iefix)
        format('embedded-opentype'),
      url(${outlineIconsWoff2}) format('woff2'),
      url(${outlineIconsWoff}) format('woff'),
      url(${outlineIconsTtf}) format('truetype'),
      url(${outlineIconsSvg}#icons) format('svg');
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }  
  
  #app {
    background-color: ${(props) => props.theme.COLORS.bgLight};
    min-height: 100%;
    min-width: 100%; 
  }

  .ui.input>input,
  .ui.form input:not([type]), 
  .ui.form input[type=email],
  .ui.form input[type=number],   
  .ui.form input[type=text],
  .ui.form input[type=password],
  .ui.selection.dropdown,
  .ui.form textarea {
    font-family: ${(props) => props.theme.FONTS.normal};
    border-radius: 6px;
    border-color: ${(props) => props.theme.COLORS.placeholder};
    line-height: 18px;
    padding: 10px 16px;

    &::placeholder {
      color:${(props) => props.theme.COLORS.placeholder};
      font-family: ${(props) => props.theme.FONTS.medium};
      font-size: 14px;
      line-height: 18px;
    }

    &:focus,&:active {
      border-color:${(props) => props.theme.COLORS.primary}
    }
  }    

  .ui.labeled.input:not([class*="corner labeled"]) .label:first-child+input:focus{
    border-left-color: ${(props) => props.theme.COLORS.primary}
  }

  .ui.labeled.input:not([class*="corner labeled"]) .label:first-child{
    background: ${(props) => props.theme.COLORS.bg};
    color: ${(props) => props.theme.COLORS.body};
  }

  .ui.form .ui.active.selection.dropdown {
    border-color:${(props) => props.theme.COLORS.primary}
    
    .ui.selection.active.dropdown .menu {
      border-color:${(props) => props.theme.COLORS.primary}
    }

    .visible.menu.transition {
      border-color:${(props) => props.theme.COLORS.primary}
    }

    .menu {
      .item {
        font-size: 14px;
        color: ${(props) => props.theme.COLORS.body};

        &.selected {
          background: ${(props) => props.theme.COLORS.selected};
        }
      }
    } 
  }

  .ui.mini.label {
    padding: 2px 0.5rem;
    border-radius: 0.125rem;
    font-size: 0.75rem;    
    line-height: 16px;
    font-family: ${(props) => props.theme.FONTS.semi_bold};
    color: ${(props) => props.theme.COLORS.bodyLight};
    background-color: ${(props) => props.theme.COLORS.bg};
    margin-left: 4px;
  }

  .ui.form .field {
    margin: 0 0 24px; 
  }

  .ui.form .fields {
    margin: 0 -.5em 24px;
  }

  .ui.form .field > label {
    color: ${(props) => props.theme.COLORS.bodyLight};
    font-family: ${(props) => props.theme.FONTS.medium};
    margin-bottom: 0.5rem;
    font-size: 0.875rem;    
  }  

  .ui.input.error {
    > input, > input:focus {
      &::placeholder {
        color: ${(props) => props.theme.COLORS.placeholder};
      }
    }
  }

  .ui.selection.dropdown {        
    &.active {
      border-color: ${(props) => props.theme.COLORS.primary};

      &:hover {
        border-color: ${(props) => props.theme.COLORS.primary};
      }
    }
    
    .menu > .item {
      border: none;
    }

    .dropdown.icon {
      font-family: Icons;          
      color: ${(props) => props.theme.COLORS.primary};      

      &:before {
        content: '\f078';
      }            
    }

    &.active.visible .dropdown.icon {
      &:before {
        content: '\f077';
      }
    }

    .visible.menu.transition {
      background: ${(props) => props.theme.COLORS.white};
      box-shadow: 0px 0px 6px rgba(43, 45, 66, 0.12);
      border-radius: 6px;
      margin-top: 0.5rem;
      border: none;

      span.text {
        font-size: 0.875rem;
        font-weight: normal;
        color: ${(props) => props.theme.COLORS.body} !important;
        background: none !important;
      }
    }    
  }

  .ui.dropdown {        
    .ui.input:not(.loading) i.icon {
      font-family: Icons;          
      color: ${(props) => props.theme.COLORS.primary};      

      &:before {
        content: '\f078';
      }            
    }

    &.active.visible .ui.input:not(.loading)  i.icon {
      &:before {
        content: '\f077';
      }
    }
  }

  .ui.form .field.error {    
    textarea, textarea:focus {
      background: ${(props) => props.theme.COLORS.white};
      border: 1px solid ${(props) => props.theme.COLORS.danger} !important;
        
      &::placeholder {
        color: ${(props) => props.theme.COLORS.placeholder};
      }
    }

    > .ui.input, > .ui.selection.dropdown {
      & > * {
        border: 0;        
      }

      & > input {
        border-radius: 8px;
      }
      
      background: ${(props) => props.theme.COLORS.white};
      border: 1px solid ${(props) => props.theme.COLORS.danger} !important;
      border-radius: 8px;

      input, i {
        color: #434343;
      }

      input, input:focus {
        background: ${(props) => props.theme.COLORS.white};
        
        &::placeholder {
          color: ${(props) => props.theme.COLORS.placeholder};
        }
      }

      .default.text {
        background: ${(props) => props.theme.COLORS.white};
        color: ${(props) => props.theme.COLORS.body};
      }

      .visible.menu.transition {
        .item {
          background: ${(props) => props.theme.COLORS.white};
          color: ${(props) => props.theme.COLORS.body};        
        }

        .item.selected, .item:hover {
          background: #0000000d;
        }
      }
    }

    & > label {
      color: ${(props) => props.theme.COLORS.bodyLight};
    }
    
    > .ui.prompt.label {    
      margin: 0.5rem 0 0;
      font-size: 12px;
      color: ${(props) => props.theme.COLORS.danger} !important;
      font-weight: normal;
      border: none !important;
      background: transparent !important;
      padding: 0;
      
      &:before {
        display: none;
      }
    } 
  }

  .ui.dimmer {
    background-color:rgb(0 0 0 / 0.6);
  }

  .ui.labeled.input .label {
    background-color: ${(props) => props.theme.COLORS.bgLight};
    min-width: 40px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.COLORS.placeholder};
    border-right: none;
  }

  .ui.labeled.input.right .label {
    border-right: 1px solid ${(props) => props.theme.COLORS.placeholder};
  }

  .ui.checkbox:not(.radio) label, .ui.checkbox:not(.radio) + label {
    color: ${(props) => props.theme.COLORS.bodyLight} !important;
  }

  a.link {
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.COLORS.body};
    }
  }    
  
  .ui.very.basic.table tr td { border: 0px; }

  .ui.checkbox label {
    padding-left: 25px;
  }
  
  .ui.radio.checked {
    label::before {
      border-color: ${(props) => props.theme.COLORS.primary} !important;
    }
    label::after {
      background-color: ${(props) => props.theme.COLORS.primary} !important;
    }
  }

  .ui.vertical.menu {
    margin-top: 0;
  }

  .ui.vertical.tabular.menu .item {
    font-family: ${(props) => props.theme.FONTS.normal};    
    font-size: 14px;
    color: ${(props) => props.theme.COLORS.bodyLight};

    &.active {
      border: none;
      border-right: inherit;
    }
  }

  ${animations}

  iframe {
    height: 100vh;
  }

  button[disabled] {
    pointer-events: unset;
    cursor: not-allowed;
  }  
  
  .text-left {
    text-align: left !important;
  }

  button.react-joyride__beacon {
    display: none !important;
  }

  code { 
    background: ${(props) => props.theme.COLORS.bgLight}; 
  }

  input[readonly] {
    background: ${(props) => props.theme.COLORS.bgLight} !important;
  }
`;

export default GlobalStyle;
