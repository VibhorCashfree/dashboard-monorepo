import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const MetaTags = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

MetaTags.propTypes = {
  title: PropTypes.string,
};

export default MetaTags;
