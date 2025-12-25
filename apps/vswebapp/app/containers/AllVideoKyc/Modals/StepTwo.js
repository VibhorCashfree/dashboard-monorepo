import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Space,
  Text,
  Popup,
  Button,
  Icon as CoherentIcon,
  Conditional,
} from '@cashfree-intl/coherent';
import { Reorder } from 'framer-motion';

import _capitalize from 'lodash/capitalize';
import _includes from 'lodash/includes';

// Components
import Icon from 'components/Icon';
import SecurityQuestion from './SecurityQuestion';

// Styled
import { StyledInfo } from '../styled';
import { BackButtonWrapper } from 'styled/common';

const StepTwo = ({ question, setQuestion, setStep }) => {
  // Check if any question is in edit mode
  const isAnyQuestionInEditMode = question.some(q => q.isEditing);
  const disabledMode = isAnyQuestionInEditMode || question.length > 4;

  // Function to handle question deletion
  const handleDeleteQuestion = id => {
    const updatedQuestions = question.filter(q => q.id !== id);
    setQuestion(updatedQuestions);
  };

  // Function to handle question editing
  const handleSaveQuestion = (id, updatedQuestion) => {
    const updatedQuestions = question.map(q =>
      q.id === id ? { ...updatedQuestion, isEditing: false } : q,
    );
    setQuestion(updatedQuestions);
  };

  // Function to toggle edit mode for a question
  const handleToggleEdit = (id, isEditing) => {
    const updatedQuestions = question.map(q =>
      q.id === id ? { ...q, isEditing } : q,
    );
    setQuestion(updatedQuestions);
  };

  // Function to add a new question
  const handleAddQuestion = () => {
    // Check if we've reached the maximum number of questions (5)
    if (question.length > 4) {
      // You could show a toast/notification here
      console.log('Maximum of 5 questions allowed');
      return;
    }

    // Find the highest ID to ensure we always have unique IDs
    const maxId =
      question.length > 0 ? Math.max(...question.map(q => q.id)) + 1 : 0;

    // Add new question with isEditing set to true
    setQuestion([
      ...question,
      { id: maxId, question: '', answer: '', isEditing: true },
    ]);
  };

  // Debugging reorder functionality
  const handleReorder = reorderedItems => {
    // Only allow reordering if no question is in edit mode
    if (!isAnyQuestionInEditMode) {
      // Update the order property based on new position
      // but preserve the original IDs
      const updatedItems = reorderedItems.map((item, index) => ({
        ...item,
        order: index, // Add or update order property
      }));

      console.log('Reordering:', updatedItems);
      setQuestion(updatedItems);
    }
  };

  return (
    <>
      <BackButtonWrapper className="mb-1" onClick={() => setStep(1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Space direction="column" gap={2}>
        <Space direction="column" gap={0.5}>
          <Space gap={1} alignItems="center">
            <Text variant="h16" strong>
              Configure security questions
            </Text>
            <Popup
              content={
                <Space direction="column">
                  <Text>What is a security question?</Text>
                  <Text color="bodyLight">
                    Security questions are pre-defined questions set by your
                    business and answered by users during form submission. These
                    answers are later verified by the agent during the Video KYC
                    call to ensure the user's identity and prevent fraud.
                  </Text>
                </Space>
              }
              trigger={
                <span>
                  <Icon name="info" className="pointer ml-1" />
                </span>
              }
            />
          </Space>

          <Text color="bodyLight" variant="b12">
            You can edit and update below questions as per you.
          </Text>
        </Space>

        <StyledInfo style={{ borderRadius: '8px' }}>
          <Text color="info" variant="b12">
            These questions will be asked by your agent and answers should match
            with real customer details/answers. It will be auto saved for future
            link generations.
          </Text>
        </StyledInfo>

        <Reorder.Group
          className="p-0 m-0"
          values={question}
          onReorder={handleReorder}
          layoutScroll
          axis="y"
        >
          {question.map(item => (
            <Reorder.Item
              value={item}
              key={item.id}
              style={{ listStyle: 'none', paddingBottom: '28px' }}
              drag={!isAnyQuestionInEditMode}
              // This is the key property to restrict dragging to the handle
              dragHandle=".drag-handle"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <SecurityQuestion
                item={item}
                onDelete={handleDeleteQuestion}
                onSave={handleSaveQuestion}
                onToggleEdit={handleToggleEdit}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <Space justifyContent="flex-start">
          <Button
            link
            icon={
              <CoherentIcon
                name="add"
                fill={disabledMode ? '#A6A7B0' : '#6930CA'}
              />
            }
            className="p-0 m-0"
            onClick={handleAddQuestion}
            disabled={disabledMode}
          >
            Add question
          </Button>
        </Space>
      </Space>
    </>
  );
};

export default StepTwo;
