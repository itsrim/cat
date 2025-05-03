import { describe, it, expect } from 'vitest';

import { Conversation } from '../../services/conversation/types';

import {
  formatDateToDDMMYY,
  groupByDate,
  sortConversationsByMostRecent
} from './utils';

describe('test formatDateToDDMMYY for history card dat on home component', () => {
  it('format a date in ISO with the format DD/MM/YY', () => {
    const input = '2025-04-14T08:42:06.614Z';
    const result = formatDateToDDMMYY(input);
    expect(result).toBe('14/04/25');
  });

  it('return empty string if invalid date', () => {
    const input = 'not-a-date';
    const result = formatDateToDDMMYY(input);
    expect(result).toBe('');
  });
});

describe('sortConversationsByMostRecent', () => {
  it('should sort conversations by most recent updatedAt', () => {
    const input: Conversation[] = [
      {
        id: '110',
        type: 'analyse_balance_anc_2022_06',
        userId: '5544',
        createdAt: '2025-04-25T06:24:15.851Z',
        updatedAt: '2025-04-25T06:24:15.851Z',
        messages: [],
        title: 'test1',
        closed: false
      },
      {
        id: '109',
        type: 'question_balance',
        userId: '5544',
        createdAt: '2025-04-25T06:24:07.329Z',
        updatedAt: '2025-04-25T06:24:07.329Z',
        messages: [],
        title: 'test2',
        closed: false
      },
      {
        id: '112',
        type: 'question_balance',
        userId: '5544',
        createdAt: '2025-04-25T07:45:00.602Z',
        updatedAt: '2025-04-25T07:45:00.602Z',
        messages: [],
        title: 'test3',
        closed: false
      }
    ];

    const result = sortConversationsByMostRecent(input);

    expect(result.map((i) => i.id)).toEqual(['112', '110', '109']);
  });
});

describe('test groupByDate : 3 conversations grouped by date (without today/yesterday)', () => {
  const data: Conversation[] = [
    {
      id: 'a',
      type: 'x',
      userId: 'u',
      createdAt: '2024-04-01T10:00:00Z',
      updatedAt: '2024-04-01T12:00:00Z',
      messages: [],
      title: 'test',
      closed: false
    },
    {
      id: 'b',
      type: 'x',
      userId: 'u',
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T11:00:00Z',
      messages: [],
      title: 'test',
      closed: false
    },
    {
      id: 'c',
      type: 'x',
      userId: 'u',
      createdAt: '2024-04-01T09:00:00Z',
      updatedAt: '2024-04-01T09:30:00Z',
      messages: [],
      title: 'test',
      closed: false
    }
  ];

  it('should group conversations by createdAt date label', () => {
    const result = groupByDate(data);

    expect(result).toHaveLength(2);
    expect(result[0].label).toMatch('1 avril 2024');
    expect(result[1].label).toMatch('20 mars 2024');
  });

  it('should sort conversations inside each group by updatedAt desc', () => {
    const result = groupByDate(data);
    const items = result.find((g) => g.label.includes('avril'))?.items;

    expect(items?.[0].id).toBe('a');
    expect(items?.[1].id).toBe('c');
  });

  it('should sort groups by date descending', () => {
    const result = groupByDate(data);
    expect(result[0].label).toMatch('1 avril 2024');
    expect(result[1].label).toMatch('20 mars 2024');
  });
});
