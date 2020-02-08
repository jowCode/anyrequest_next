import { IConversation } from 'app/shared/model/conversation.model';

export interface IChatMessage {
  id?: number;
  owningUser?: string;
  message?: string;
  conversation?: IConversation;
}

export class ChatMessage implements IChatMessage {
  constructor(public id?: number, public owningUser?: string, public message?: string, public conversation?: IConversation) {}
}
