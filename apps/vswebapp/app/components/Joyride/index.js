import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import Joyride, { STATUS } from 'react-joyride';

import { useTour } from 'providers/TourProvider';

const JoyrideComponent = () => {
  const navigate = useNavigate();
  const { COLORS } = useContext(ThemeContext);

  const {
    nextStep,
    tourSteps,
    runTour,
    currentStepIndex,
    setRunTour,
  } = useTour();

  const handleCallback = data => {
    const { status, action, lifecycle } = data;

    if (
      [STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
      action === 'close'
    ) {
      setRunTour(false);
    } else if (action === 'next' && lifecycle === 'complete') {
      if (tourSteps[currentStepIndex + 1]) {
        const nextLocation = tourSteps[currentStepIndex + 1];

        if (nextLocation.target === 'redirect') {
          navigate(nextLocation.redirect);
        }

        nextStep();
      } else {
        setRunTour(false);
      }
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={runTour}
      continuous
      hideCloseButton
      hideBackButton
      disableScrollParentFix
      callback={handleCallback}
      stepIndex={currentStepIndex}
      styles={{
        options: {
          primaryColor: COLORS.bgLight,
          textColor: COLORS.bgLight,
          backgroundColor: COLORS.focused,
        },
        buttonNext: {
          backgroundColor: '#FFFFFF',
          color: COLORS.primary,
          padding: '6px 16px',
          fontWeight: '600',
        },
        tooltipTitle: {
          textAlign: 'left',
          padding: '0px 10px',
        },
        tooltipContent: {
          textAlign: 'left',
          padding: '10px',
        },
        floaterStyles: {
          arrow: {
            color: COLORS.focused,
          },
        },
      }}
    />
  );
};

export default JoyrideComponent;
