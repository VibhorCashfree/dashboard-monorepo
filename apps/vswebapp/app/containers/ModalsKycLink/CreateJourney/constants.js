export const initialNodes = [
  {
    id: 'start',
    position: { x: 100, y: 0 },
    type: 'start',
  },
  { id: 'end', position: { x: 100, y: 300 }, type: 'end' },
];

export const initialEdges = [
  {
    id: 'start-end',
    source: 'start',
    target: 'end',
    type: 'plus-edge',
    style: { stroke: 'red', strokeWidth: 2 },
  },
];

export const REQUIRED_FIELDS = ['templateName', 'description'];
