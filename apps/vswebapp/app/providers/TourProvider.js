import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

export const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [tourSteps, setTourSteps] = useState([]);
  const [runTour, setRunTour] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startTour = (steps, tourValue = false) => {
    setTourSteps(steps);
    setRunTour(tourValue);
    setCurrentStepIndex(0);
  };

  const nextStep = () => {
    setCurrentStepIndex(prevIndex => prevIndex + 1);
  };

  const value = {
    tourSteps,
    currentStepIndex,
    runTour,
    startTour,
    nextStep,
    setRunTour,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTour = () => useContext(TourContext);

TourProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
