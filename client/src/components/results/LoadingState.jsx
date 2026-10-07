import React, { useEffect, useState } from 'react';
import { Mail, MessageCircle, Smartphone, Sparkles } from 'lucide-react';

const channels = [
  { name: 'Email', Icon: Mail },
  { name: 'WhatsApp', Icon: MessageCircle },
  { name: 'SMS', Icon: Smartphone }
];

function SkeletonBlock({ className = '', style }) {
  return <span className={`skeleton-shimmer ${className}`} style={style} />;
}

export function LoadingState({ productName }) {
  const [activeChannel, setActiveChannel] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveChannel((currentChannel) => (currentChannel + 1) % channels.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="generation-state" role="status" aria-live="polite">
      <div className="generation-heading flex items-center gap-4">
        <div className="generation-emblem w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <p className="generation-kicker text-[10px] font-bold uppercase tracking-[0.16em]">Campaign in progress</p>
          <h3 className="section-title text-lg sm:text-xl font-bold text-[#183a35] mt-1">Your campaign is taking shape</h3>
          <p className="text-xs text-[#718178] mt-1 truncate">
            {productName ? `Writing for ${productName}` : 'Bringing your campaign brief to life'}
          </p>
        </div>
      </div>

      <div className="generation-progress mt-6" role="progressbar" aria-label="Campaign generation in progress" aria-valuetext="In progress">
        <span />
      </div>

      <div className="generation-channel-track" aria-hidden="true">
        {channels.map(({ name, Icon }, index) => (
          <div key={name} className={`generation-channel-indicator ${activeChannel === index ? 'is-active' : ''}`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{name}</span>
          </div>
        ))}
      </div>

      <div className="generation-skeleton-toolbar" aria-hidden="true">
        <div className="flex items-center gap-3 min-w-0">
          <SkeletonBlock className="skeleton-square" />
          <div className="flex-1 min-w-0">
            <SkeletonBlock className="skeleton-line skeleton-title-line" />
            <SkeletonBlock className="skeleton-line skeleton-subtitle-line mt-2" />
          </div>
        </div>
        <div className="generation-skeleton-actions">
          <SkeletonBlock className="skeleton-action" />
          <SkeletonBlock className="skeleton-action" />
        </div>
      </div>

      <section className="generation-skeleton-panel skeleton-subjects" aria-hidden="true">
        <div className="generation-skeleton-heading">
          <SkeletonBlock className="skeleton-line skeleton-heading-line" />
          <SkeletonBlock className="skeleton-pill" />
        </div>
        <div className="generation-skeleton-list">
          {['74%', '61%', '83%', '56%', '68%'].map((width, index) => (
            <div className="generation-skeleton-subject" key={index}>
              <SkeletonBlock className="skeleton-index" />
              <SkeletonBlock className="skeleton-line" style={{ width }} />
              <SkeletonBlock className="skeleton-action" />
            </div>
          ))}
        </div>
      </section>

      <section className="generation-skeleton-panel skeleton-previews" aria-hidden="true">
        <div className="generation-skeleton-heading">
          <SkeletonBlock className="skeleton-line skeleton-heading-line" />
          <SkeletonBlock className="skeleton-pill" />
        </div>
        <div className="generation-skeleton-inbox">
          {['88%', '72%', '80%'].map((width, index) => (
            <div className="generation-skeleton-inbox-row" key={index}>
              <SkeletonBlock className="skeleton-avatar" />
              <div className="flex-1 min-w-0">
                <SkeletonBlock className="skeleton-line skeleton-sender-line" />
                <SkeletonBlock className="skeleton-line mt-2" style={{ width }} />
              </div>
              <SkeletonBlock className="skeleton-action" />
            </div>
          ))}
        </div>
      </section>

      <section className="generation-skeleton-panel skeleton-email" aria-hidden="true">
        <div className="generation-skeleton-heading">
          <SkeletonBlock className="skeleton-line skeleton-heading-line" />
          <SkeletonBlock className="skeleton-action" />
        </div>
        <div className="generation-skeleton-email-window">
          <div className="generation-skeleton-email-toolbar">
            <SkeletonBlock className="skeleton-avatar" />
            <div className="flex-1 min-w-0">
              <SkeletonBlock className="skeleton-line skeleton-sender-line" />
              <SkeletonBlock className="skeleton-line skeleton-meta-line mt-2" />
            </div>
          </div>
          <SkeletonBlock className="skeleton-line skeleton-email-subject" />
          <div className="generation-skeleton-email-body">
            {['100%', '92%', '96%', '72%'].map((width, index) => (
              <SkeletonBlock className="skeleton-line" key={index} style={{ width }} />
            ))}
          </div>
        </div>
      </section>

      <div className="generation-skeleton-messages">
        <section className="generation-skeleton-panel skeleton-whatsapp" aria-hidden="true">
          <div className="generation-skeleton-heading">
            <SkeletonBlock className="skeleton-line skeleton-heading-line" />
            <SkeletonBlock className="skeleton-action" />
          </div>
          <div className="generation-skeleton-chat-window">
            <div className="generation-skeleton-chat-header"><SkeletonBlock className="skeleton-avatar" /><SkeletonBlock className="skeleton-line skeleton-chat-title" /></div>
            <div className="generation-skeleton-chat-body">
              <div className="generation-skeleton-chat-bubble">
                <SkeletonBlock className="skeleton-line" />
                <SkeletonBlock className="skeleton-line skeleton-chat-line-short mt-2" />
              </div>
            </div>
          </div>
        </section>

        <section className="generation-skeleton-panel skeleton-sms" aria-hidden="true">
          <div className="generation-skeleton-heading">
            <SkeletonBlock className="skeleton-line skeleton-heading-line" />
            <SkeletonBlock className="skeleton-action" />
          </div>
          <div className="generation-skeleton-sms-window">
            <div className="generation-skeleton-sms-bar"><SkeletonBlock className="skeleton-line skeleton-sms-title" /></div>
            <div className="generation-skeleton-sms-body">
              <div className="generation-skeleton-sms-bubble">
                <SkeletonBlock className="skeleton-line" />
                <SkeletonBlock className="skeleton-line skeleton-chat-line-short mt-2" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <p className="text-[11px] text-[#829087] text-center">This can take a few moments while the copy is generated.</p>
    </div>
  );
}
