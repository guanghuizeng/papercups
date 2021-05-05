import request from 'superagent';
import qs from 'query-string';
import {getAuthTokens} from '../storage';
import {Conversation, User} from '../types';
import * as queryString from 'query-string';
import {nanoid} from 'nanoid';

// TODO: handle this on the server instead
function now() {
  const date = new Date();

  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = LoginParams & {
  companyName?: string;
  inviteToken?: string;
  passwordConfirmation: string;
};

export type ResetPasswordParams = {
  password: string;
  passwordConfirmation: string;
};

export type WidgetSettingsParams = {
  id?: string;
  title: string;
  subtitle: string;
  color: string;
  greeting?: string;
  new_message_placeholder?: string;
};

export type EventSubscriptionParams = {
  webhook_url: string;
};

export const getAccessToken = (): string | null => {
  const tokens = getAuthTokens();

  return (tokens && tokens.token) || null;
};

export const getRefreshToken = (): string | null => {
  const tokens = getAuthTokens();

  return (tokens && tokens.renew_token) || null;
};

export const me = async (token = getAccessToken()): Promise<User> => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/me`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const login = async ({email, password}: LoginParams) => {
  return request
    .post(`/api/session`)
    .send({user: {email, password}})
    .then((res) => res.body.data);
};

export const logout = async () => {
  return request.delete(`/api/session`).then((res) => res.body);
};

export const register = async ({
  companyName,
  inviteToken,
  email,
  password,
  passwordConfirmation,
}: RegisterParams) => {
  return request
    .post(`/api/registration`)
    .send({
      user: {
        company_name: companyName,
        invite_token: inviteToken,
        email,
        password,
        password_confirmation: passwordConfirmation,
      },
    })
    .then((res) => res.body.data);
};

export const renew = async (token = getRefreshToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/session/renew`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const verifyUserEmail = async (verificationToken: string) => {
  return request
    .post(`/api/verify_email`)
    .send({token: verificationToken})
    .then((res) => res.body.data);
};

export const sendPasswordResetEmail = async (email: string) => {
  return request
    .post(`/api/reset_password`)
    .send({email})
    .then((res) => res.body.data);
};

export const attemptPasswordReset = async (
  passwordResetToken: string,
  {password, passwordConfirmation}: ResetPasswordParams
) => {
  return request
    .put(`/api/reset_password`)
    .send({
      password,
      password_confirmation: passwordConfirmation,
      token: passwordResetToken,
    })
    .then((res) => res.body.data);
};

export const createNewCustomer = async (accountId: string) => {
  return request
    .post(`/api/customers`)
    .send({
      customer: {
        account_id: accountId,
        first_seen: now(),
        last_seen: now(),
      },
    }) // TODO: send over some metadata?
    .then((res) => res.body.data);
};

export const fetchCustomers = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/customers`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchCustomer = async (id: string, token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/customers/${id}`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateCustomer = async (
  id: string,
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/customers/${id}`)
    .set('Authorization', token)
    .send({
      customer: updates,
    })
    .then((res) => res.body.data);
};

export const createNewConversation = async (
  customerId: string,
  params?: object,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/conversations`)
    .set('Authorization', token)
    .send({
      conversation: {
        customer_id: customerId,
        ...params,
      },
    })
    .then((res) => res.body.data);
};

export const fetchAccountInfo = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/accounts/me`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateAccountInfo = async (
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/accounts/me`)
    .set('Authorization', token)
    .send({
      account: updates,
    })
    .then((res) => res.body.data);
};

export const fetchUserProfile = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/profile`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateUserProfile = async (
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/profile`)
    .set('Authorization', token)
    .send({
      user_profile: updates,
    })
    .then((res) => res.body.data);
};

export const fetchUserSettings = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get('/api/user_settings')
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateUserSettings = async (
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put('/api/user_settings')
    .set('Authorization', token)
    .send({
      user_settings: updates,
    })
    .then((res) => res.body.data);
};

export const fetchAllConversations = async (
  token = getAccessToken()
): Promise<Array<Conversation>> => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/conversations`)
    .query({status: 'open'})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchMyConversations = async (
  userId: number,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/conversations`)
    .query({assignee_id: userId, status: 'open'})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchPriorityConversations = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/conversations`)
    .query({priority: 'priority', status: 'open'})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchClosedConversations = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/conversations`)
    .query({status: 'closed'})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchConversation = async (
  id: string,
  token = getAccessToken()
): Promise<Conversation> => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/conversations/${id}`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const generateShareConversationToken = async (
  conversationId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/conversations/${conversationId}/share`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchSharedConversation = async (
  id: string,
  token: string
): Promise<Conversation> => {
  if (!token) {
    throw new Error('Access denied!');
  }

  return request
    .get(`/api/conversations/shared`)
    .query({token, conversation_id: id})
    .then((res) => res.body.data);
};

export const updateConversation = async (
  conversationId: string,
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/conversations/${conversationId}`)
    .set('Authorization', token)
    .send(updates)
    .then((res) => res.body.data);
};

export const deleteConversation = async (
  conversationId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .delete(`/api/conversations/${conversationId}`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const createNewMessage = async (
  conversationId: string,
  message: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/messages`)
    .set('Authorization', token)
    .send({
      message: {
        conversation_id: conversationId,
        sent_at: new Date().toISOString(),
        ...message,
      },
    })
    .then((res) => res.body.data);
};

export const countMessages = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/messages/count`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchCustomerConversations = async (
  customerId: string,
  accountId: string
) => {
  return request
    .get(`/api/conversations/customer`)
    .query({customer_id: customerId, account_id: accountId})
    .then((res) => res.body.data);
};

export const generateUserInvitation = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/user_invitations`)
    .send({user_invitation: {}})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchSlackAuthorization = async (
  type = 'reply',
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/slack/authorization`)
    .query({type})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchGmailAuthorization = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/gmail/authorization`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export type EmailParams = {
  recipient: string;
  subject: string;
  message: string;
};

export const sendGmailNotification = async (
  {recipient, subject, message}: EmailParams,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/gmail/send`)
    .send({recipient, subject, message})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchEventSubscriptions = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/event_subscriptions`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const verifyWebhookUrl = async (
  url: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/event_subscriptions/verify`)
    .set('Authorization', token)
    .send({url})
    .then((res) => res.body.data);
};

export const createEventSubscription = async (
  params: EventSubscriptionParams,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/event_subscriptions`)
    .set('Authorization', token)
    .send({
      event_subscription: params,
    })
    .then((res) => res.body.data);
};

export const updateEventSubscription = async (
  id: string,
  updates: EventSubscriptionParams,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/event_subscriptions/${id}`)
    .set('Authorization', token)
    .send({
      event_subscription: updates,
    })
    .then((res) => res.body.data);
};

export const deleteEventSubscription = async (
  id: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .delete(`/api/event_subscriptions/${id}`)
    .set('Authorization', token);
};

export const authorizeSlackIntegration = async (
  code: string,
  type: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/slack/oauth`)
    .query({code, type})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const authorizeGmailIntegration = async (
  code: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/gmail/oauth`)
    .query({code})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateWidgetSettings = async (
  widgetSettingsParams: WidgetSettingsParams,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/widget_settings`)
    .send({widget_settings: widgetSettingsParams})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchDefaultPaymentMethod = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/payment_methods`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchBillingInfo = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/billing`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const createSubscriptionPlan = async (
  plan: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/billing`)
    .send({plan})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateSubscriptionPlan = async (
  plan: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/billing`)
    .send({plan})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const createPaymentMethod = async (
  paymentMethod: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/payment_methods`)
    .send({payment_method: paymentMethod})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const disableAccountUser = async (
  userId: number | string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/users/${userId}/disable`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const enableAccountUser = async (
  userId: number | string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/users/${userId}/enable`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchCustomerNotes = async (
  customerId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/notes`)
    .query({customer_id: customerId})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const createCustomerNote = async (
  customerId: string,
  body: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/notes`)
    .set('Authorization', token)
    .send({
      note: {
        body,
        customer_id: customerId,
      },
    })
    .then((res) => res.body.data);
};

export const deleteCustomerNote = async (
  noteId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request.delete(`/api/notes/${noteId}`).set('Authorization', token);
};

export const fetchAllTags = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/tags`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const createTag = async (name: string, token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/tags`)
    .send({tag: {name}})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const addConversationTag = async (
  conversationId: string,
  tagId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/conversations/${conversationId}/tags`)
    .send({tag_id: tagId})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const removeConversationTag = async (
  conversationId: string,
  tagId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .delete(`/api/conversations/${conversationId}/tags/${tagId}`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const addCustomerTag = async (
  customerId: string,
  tagId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/customers/${customerId}/tags`)
    .send({tag_id: tagId})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const removeCustomerTag = async (
  customerId: string,
  tagId: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .delete(`/api/customers/${customerId}/tags/${tagId}`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

type BrowserSessionFilters = {
  sessionIds?: Array<string>;
  customerId?: string;
  isActive?: boolean;
  limit?: number;
};

export const fetchBrowserSessions = async (
  {customerId, isActive, limit = 100, sessionIds = []}: BrowserSessionFilters,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/browser_sessions`)
    .query(
      qs.stringify(
        {
          ids: sessionIds,
          customer_id: customerId,
          active: isActive,
          limit,
        },
        {arrayFormat: 'bracket'}
      )
    )
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const countBrowserSessions = async (
  {customerId, isActive}: BrowserSessionFilters,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/browser_sessions/count`)
    .query(
      qs.stringify(
        {
          customer_id: customerId,
          active: isActive,
        },
        {arrayFormat: 'bracket'}
      )
    )
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchBrowserSession = async (
  id: string,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/browser_sessions/${id}`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

type ReportingFilters = {
  from_date?: string | null;
  to_date?: string | null;
};

export const fetchReportingData = async (
  filters = {} as ReportingFilters,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/reporting`)
    .query(filters)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const createSchedulingLink = async (
  scheduling_link: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/scheduling_links`)
    .send({scheduling_link})
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const updateSchedulingLink = async (
  eventTypeId: string,
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/scheduling_links/${eventTypeId}`)
    .set('Authorization', token)
    .send({
      scheduling_link: updates,
    })
    .then((res) => res.body.data);
};

export const createDemo = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/demos`)
    .send({
      demo: {
        name: 'type1',
        count: 1,
      },
    })
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchSchedulingLinks = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/scheduling_links/`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchSchedulingLinksBrief = async (user: string) => {
  return request
    .get(`/api/scheduling_links_brief/`)
    .then((res) => res.body.data);
};

export const createSchedule = async (
  schedule: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .post(`/api/schedules/`)
    .set('Authorization', token)
    .send({
      schedule,
    })
    .then((res) => res.body.data);
};

export const fetchSchedules = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/schedules/`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchScheduleById = async (user: string, schedule_id: string) => {
  return request
    .get(`/api/schedules`)
    .query({schedule_id})
    .then((res) => res.body.data);
};

export const updateSchedule = async (
  id: string,
  updates: any,
  token = getAccessToken()
) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .put(`/api/schedules/${id}`)
    .set('Authorization', token)
    .send({
      schedule: updates,
    })
    .then((res) => res.body.data);
};

export const fetchUserProfileBySlug = async (slug: string) => {
  return request
    .get(`/api/profile`)
    .query({slug})
    .then((res) => res.body.data);
};

export const fetchSchedulingLinkByUrl = async (user: string, url: string) => {
  return request
    .get(`/api/event_type`)
    .query({url})
    .then((res) => res.body.data);
};

export interface CreateEventParams {
  user: string;
  link: string;
  event: {
    displayName: string;
    email: string;
    startAt: string;
    endAt: string;
    fields: any;
  };
}

export const createEvent = async (params: CreateEventParams) => {
  return request
    .post(`/api/scheduled_events`)
    .send(params)
    .then((res) => res.body.data);
};

export const createScheduledEvent = async (
  scheduling_link_id: string,
  start_time: string,
  guest_name: string
) => {
  return request
    .post(`/api/scheduled_events`)
    .send({
      event: {
        scheduling_link_id,
        start_time,
        guest_name,
      },
    })
    .then((res) => res.body.data);
};

export const fetchDatetimeSpotsByRange = async (
  event_type_id: string,
  start_time: string,
  end_time: string
) => {
  return request
    .get(`/api/booking/scheduling_links/${event_type_id}/calendar/range`)
    .query({
      start_time,
      end_time,
    })
    .then((res) => res.body.data);
};

export const fetchScheduledEvents = async (token = getAccessToken()) => {
  if (!token) {
    throw new Error('Invalid token!');
  }

  return request
    .get(`/api/scheduled_events/`)
    .set('Authorization', token)
    .then((res) => res.body.data);
};

export const fetchIntervals = async (
  userSlug: string,
  linkSlug: string,
  from: string,
  to: string
) => {
  const url = queryString.stringifyUrl({
    url: `/api/links/${userSlug}/${linkSlug}/intervals`,
    query: {
      from,
      to,
    },
  });
  return request
    .get(`/api/links/${userSlug}/${linkSlug}/intervals`)
    .query({
      from,
      to,
    })
    .then((res) => res.body.data);
};