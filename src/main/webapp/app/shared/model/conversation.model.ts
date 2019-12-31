import { IChatMessage } from 'app/shared/model/chat-message.model';
import { IContribution } from 'app/shared/model/contribution.model';
import { ConversationStatus } from 'app/shared/model/enumerations/conversation-status.model';

export interface IConversation {
  id?: number;
  conversationStatus?: ConversationStatus;
  chatMessages?: IChatMessage[];
  contribution?: IContribution;
}

export class Conversation implements IConversation {
  constructor(
    public id?: number,
    public conversationStatus?: ConversationStatus,
    public chatMessages?: IChatMessage[],
    public contribution?: IContribution
  ) {}
}
