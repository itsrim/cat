import i18n from '~/i18n';

import { Conversation } from '../../services/conversation/types';

/**
 * function that replace date by today and yesterday if exists, and groupe by day for history chatbot component
 * @param conversations
 * @returns Array<{
      label: string;
      items: Conversation[];
      date: Date;
    }>
 */
export const groupByDate = (conversations: Conversation[]) => {
  const now = new Date();
  const todayKey = now.toDateString();
  const yesterdayKey = new Date(now.getTime() - 86400000).toDateString();

  const groups: Record<
    string,
    { label: string; items: Conversation[]; date: Date }
  > = {};

  for (const conv of conversations) {
    const date = new Date(conv.createdAt);
    const key = date.toDateString();

    let label: string;
    if (key === todayKey) {
      label = i18n.t('history.today');
    } else if (key === yesterdayKey) {
      label = i18n.t('history.yesterday');
    } else {
      label = new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    }

    if (!groups[key]) {
      groups[key] = { label, items: [], date };
    }
    groups[key].items.push(conv);
  }

  const sortedGroups = Object.values(groups).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  sortedGroups.forEach((group) => {
    group.items = sortConversationsByMostRecent(group.items);
  });

  return sortedGroups;
};

export const formatDateToDDMMYY = (dateString: string): string => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(date);
};

export const sortConversationsByMostRecent = (
  data: Conversation[]
): Conversation[] => {
  return data.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
};
