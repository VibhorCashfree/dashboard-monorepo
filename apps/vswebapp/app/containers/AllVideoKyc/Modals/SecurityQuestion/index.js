import React, { useState } from 'react';
import {
  Space,
  Text,
  Icon as CoherentIcon,
  InputWithAction,
  Conditional,
  toast,
} from '@cashfree-intl/coherent';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Icon from 'components/Icon';

// Styled
import {
  AnswerText,
  CardHeader,
  DragHandle,
  StyledCard,
  StyledButton,
  CardBody,
} from './styled';

const SecurityQuestion = ({ item, onSave, onDelete, onToggleEdit }) => {
  //   const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(item.question);
  const [editedAnswer, setEditedAnswer] = useState(item.answer);
  const { isEditing } = item;

  const handleSave = () =>
    onSave &&
    onSave(item.id, {
      ...item,
      question: editedQuestion,
      answer: editedAnswer,
      isEditing: false,
    });

  const handleDelete = () => onDelete && onDelete(item.id);
  const handleEdit = () => onToggleEdit && onToggleEdit(item.id, true);

  const handleCopy = () => {
    const textToCopy = `Q: ${editedQuestion}\nA: ${editedAnswer}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success('Question and answer copied.');
      })
      .catch(err => {
        toast.error('Could not copy text: ', err);
      });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isEditing ? 'edit' : 'view'}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {!isEditing ? (
          <DragHandle className="drag-handle">
            <Space justifyContent="space-between" fullWidth>
              <Space gap={1}>
                <Icon name="drag" />
                <Space direction="column" gap={0.5}>
                  <Text variant="b14">{item.question}</Text>
                  <AnswerText color="bodyLight">{item.answer}</AnswerText>
                </Space>
              </Space>
              <CoherentIcon
                className="pointer"
                name="edit"
                onClick={handleEdit}
              />
            </Space>
          </DragHandle>
        ) : (
          <StyledCard>
            <CardHeader alignItems="center" justifyContent="space-between">
              <Space gap={2}>
                <CoherentIcon
                  name="copy"
                  className="pointer"
                  onClick={handleCopy}
                />
                <CoherentIcon
                  name="delete"
                  className="pointer"
                  onClick={handleDelete}
                />
              </Space>
              <StyledButton
                disabled={!(editedAnswer && editedQuestion)}
                secondary
                onClick={handleSave}
              >
                Save
              </StyledButton>
            </CardHeader>
            <CardBody>
              <Space direction="column" gap={2} fullWidth>
                <InputWithAction
                  label="Q"
                  fluid
                  value={editedQuestion}
                  onChange={e => setEditedQuestion(e.target.value)}
                />
                <InputWithAction
                  label="A"
                  fluid
                  value={editedAnswer}
                  onChange={e => setEditedAnswer(e.target.value)}
                />
              </Space>
            </CardBody>
          </StyledCard>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SecurityQuestion;
