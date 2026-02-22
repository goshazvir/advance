/* eslint-disable @typescript-eslint/no-explicit-any */

import {UserRole} from '@/domain/Tenant';

interface MonitoringUser {
  id?: string;
  email?: string;
  username?: string;
  role?: UserRole;
  [key: string]: any;
}

interface MonitoringEvent {
  event_id: string;
  message?: string;
  level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  tags?: Record<string, string>;
  extra?: Record<string, any>;
  user?: MonitoringUser;
  contexts?: Record<string, any>;
}

interface IMonitoringService {
  captureEvent(event: MonitoringEvent): void;
  captureException(error: Error, context?: Record<string, any>): void;
  captureMessage(message: string, level?: MonitoringEvent['level']): void;
  setUser(user: MonitoringEvent['user']): void;
  setTag(key: string, value: string): void;
  setExtra(key: string, value: any): void;
  clearContext(): void;
}

export enum MonitoringEventIds {
  GENERAL_ERROR = 'GENERAL_ERROR',
  UNHANDLED_REJECTION = 'UNHANDLED_REJECTION',
  UNCAUGHT_EXCEPTION = 'UNCAUGHT_EXCEPTION',
  API_REQUEST_ERROR = 'API_REQUEST_ERROR',
  API_RESPONSE_ERROR = 'API_RESPONSE_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  UI_RENDERING_ERROR = 'UI_RENDERING_ERROR',
  UI_EVENT_HANDLING_ERROR = 'UI_EVENT_HANDLING_ERROR',
  PERFORMANCE_ISSUE = 'PERFORMANCE_ISSUE',
  THIRD_PARTY_INTEGRATION_ERROR = 'THIRD_PARTY_INTEGRATION_ERROR',
}

interface CaptureEventOptions {
  event_id: MonitoringEventIds;
  message?: string;
  level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  tags?: Record<string, string>;
  extra?: Record<string, any>;
}

class ConsoleMonitoringService implements IMonitoringService {
  private static instance: ConsoleMonitoringService;

  public static getInstance(): ConsoleMonitoringService {
    if (!ConsoleMonitoringService.instance) {
      ConsoleMonitoringService.instance = new ConsoleMonitoringService();
    }
    return ConsoleMonitoringService.instance;
  }

  captureEvent(event: MonitoringEvent): void {
    console.log('[Monitoring] Event:', event.event_id, event.message);
  }

  captureException(error: Error, context?: Record<string, any>): void {
    console.error('[Monitoring] Exception:', error.message, context);
  }

  captureMessage(
    message: string,
    level: MonitoringEvent['level'] = 'info',
  ): void {
    console.log(`[Monitoring] ${level}:`, message);
  }

  setUser(_user: MonitoringEvent['user']): void {}

  setTag(_key: string, _value: string): void {}

  setExtra(_key: string, _value: any): void {}

  clearContext(): void {}
}

const monitoringService = ConsoleMonitoringService.getInstance();

const captureMonitoringEvent = ({
  event_id,
  message,
  level = 'info',
}: CaptureEventOptions) => {
  monitoringService.captureEvent({
    event_id,
    message,
    level,
  });
};

export {monitoringService, captureMonitoringEvent};

export type {MonitoringUser, MonitoringEvent, IMonitoringService};
