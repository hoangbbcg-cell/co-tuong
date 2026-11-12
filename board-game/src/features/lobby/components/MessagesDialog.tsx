import {
  parseRoomShare,
  createRoomShare,
  RoomShareCard,
} from "./RoomShareCard";
import { roomSocket } from "../../../services/socket";
import { HovangLoadingOverlay } from "../../../components/HovangLoadingOverlay";
import { AccountAvatar } from "./AccountAvatar";
import { MessageImagePreview } from "./MessageImagePreview";
import { createPortal } from "react-dom";
import {
  searchFieldMetrics,
  searchFieldTextSize,
} from "../../../lib/searchFieldMetrics";
import { useInviteSentNotice } from "./InviteSentNotice";
import { MessagesBackButton } from "./MessagesBackButton";
import { SettingsIcon } from "./SettingsIcon";
import {
  MessagesInboxInvitations,
  MessagesInvitationBadge,
} from "./MessagesInboxInvitations";
import { useGroupInvitations } from "../hooks/useGroupInvitations";
import {
  messagesFriendsField,
  messagesFriendsInput,
} from "./messagesInputStyles";
import historyParchmentBackground from "../../../assets/history/history-parchment-background.webp";
import { socialPlayerRowClass, getSocialRowStyle } from "./SocialDialogFrame";
import { SocialPlayerName, socialPanelClass } from "./SocialUi";
import { MessageAccountAvatar } from "./MessageAccountAvatar";
import { isMessageImage, prepareMessageImage } from "../../../lib/messageImage";
import {
  useDatabaseMessages,
  type DatabaseConversation,
  type PendingGroupMember,
  type BlockedGroupMember,
  type GroupMemberRole,
} from "../hooks/useDatabaseMessages";
import { errorMessage } from "../../../services/api";

import { createClientId } from "../../../lib/clientId";
import { NumberText } from "../../../lib/NumberText";
import { useEffect, useState, type CSSProperties, type RefObject } from "react";
import { useRef, type FormEvent, type MouseEvent } from "react";
import type { useRankingLayout } from "../hooks/useRankingLayout";
import { CrispUiImage } from "../../../lib/CrispUiImage";
import { getCrispUiLayout } from "../../../lib/crispUiRendering";
import {
  buttonInteraction,
  messageSelectionHighlight,
  messageScrollbarClass,
} from "../../../lib/uiClasses";
import {
  MessagesSidebar,
  MessagesChatPane,
  MessagesDialogSurface,
} from "./MessagesPanels";
import {
  MessagesOptionsPanel,
  type NotificationMuteDuration,
} from "./MessagesOptionsPanel";
import {
  MessagesCreateGroupPanel,
  type MessagesCreateGroupPayload,
} from "./MessagesCreateGroupPanel";
import {
  MessagesFriendButton,
  MessagesFriendRemovalConfirmation,
} from "./MessagesFriendButton";
import { MessagesGroupAvatar } from "./MessagesGroupAvatar";
import { getAppViewportSize } from "../../../lib/desktopCanvasMetrics";
import { useMessageFriendship } from "../hooks/useMessageFriendship";
import { getMessageFriendContacts } from "./FriendsDialog";
import { useSessionStore } from "../../../store/sessionStore";
import { MESSAGE_PANEL_SIZE } from "./messagesPanelLayout";
import picolozz from "../../../assets/messages/avatar-picolozz.png";
import khoi from "../../../assets/messages/avatar-khoi.png";
import an from "../../../assets/messages/avatar-an.png";
import { computerAvatar as computer } from "../../../lib/computerAvatar";
import dung from "../../../assets/messages/avatar-dung.png";
import tuan from "../../../assets/messages/avatar-tuan.png";
import han from "../../../assets/messages/avatar-han.png";
import phat from "../../../assets/messages/avatar-phat.png";
import send from "../../../assets/messages/send.png";
import more from "../../../assets/messages/more.png";
import defaultAvatar from "../../../assets/icons/avatar.svg";
import defaultGroupAvatar from "../../../assets/messages/create-group/avatar.png";

const fixtureNow = Date.now();
const minutesAgo = (minutes: number) => fixtureNow - minutes * 60_000;
const memberPreviewGroupId = "demo-group-member";
type MessageItem = {
  eventType?: "group-left" | null;
  displayName?: string;
  avatarCode?: string;
  avatarFrameCode?: string;
  id: number | string;
  text: string;
  outgoing: boolean;
  sentAt: number;
  blocked?: boolean;
};
type ConversationItem = {
  name: string;
  title?: string;
  playerId?: string;
  image: string;
  status: "online" | "offline";
  text: string;
  lastMessageAt: number;
  isGroup?: boolean;
  members?: string[];
  creatorName?: string;
};
export type MessageConversationRequest = {
  id: number;
  name: string;
  playerId?: string;
  image?: string;
  status?: "online" | "offline";
};

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

const messages: MessageItem[] = [
  { id: 1, text: "Chào bạn!", outgoing: false, sentAt: minutesAgo(36) },
  { id: 2, text: "Chào bạn!", outgoing: true, sentAt: minutesAgo(35) },
  { id: 3, text: "Vào bàn nhé?", outgoing: false, sentAt: minutesAgo(25) },
  { id: 4, text: "Ok, đợi mình chút.", outgoing: true, sentAt: minutesAgo(24) },
  {
    id: 5,
    text: "Được thôi, mình tạo bàn ngay.",
    outgoing: false,
    sentAt: minutesAgo(23),
  },
  { id: 6, text: "Vào thôi! 💪", outgoing: true, sentAt: minutesAgo(4) },
  {
    id: 7,
    text: "Chúc bạn chơi vui! 😊",
    outgoing: false,
    sentAt: minutesAgo(3),
  },
];
const latestMessageText = messages[messages.length - 1].text;
const conversations: ConversationItem[] = [
  {
    name: "Picolozz",
    image: picolozz,
    status: "online",
    text: latestMessageText,
    lastMessageAt: messages[messages.length - 1].sentAt,
  },
  {
    name: "Nguyễn Hoàng Minh Khôi",
    image: khoi,
    status: "online",
    text: "Vào bàn nhé?",
    lastMessageAt: minutesAgo(28),
  },
  {
    name: "An",
    image: an,
    status: "offline",
    text: "Hẹn gặp lại!",
    lastMessageAt: minutesAgo(135),
  },
  {
    name: "Ông Hoàng",
    image: computer,
    status: "offline",
    text: "Thử thách một ván không?",
    lastMessageAt: minutesAgo(26 * 60),
  },
  {
    name: "Lê Quốc Dũng",
    image: dung,
    status: "offline",
    text: "Chúc bạn chơi vui!",
    lastMessageAt: minutesAgo(30 * 60),
  },
  {
    name: "Trần Anh Tuấn",
    image: tuan,
    status: "offline",
    text: "Mai đánh tiếp nhé.",
    lastMessageAt: minutesAgo(36 * 60),
  },
  {
    name: "Phạm Gia Hân",
    image: han,
    status: "offline",
    text: "Cảm ơn bạn!",
    lastMessageAt: minutesAgo(48 * 60),
  },
  {
    name: "Đỗ Minh Phát",
    image: phat,
    status: "offline",
    text: "Ván này căng quá!",
    lastMessageAt: minutesAgo(3 * 24 * 60),
  },
];

const initialThreads = Object.fromEntries(
  conversations.map((conversation) => [
    conversation.name,
    conversation.name === "Picolozz"
      ? messages
      : [
          {
            id: 1,
            text: conversation.text,
            outgoing: false,
            sentAt: conversation.lastMessageAt,
          },
        ],
  ]),
) as Record<string, MessageItem[]>;

function Dot({ status }: { status: "online" | "offline" }) {
  return (
    <span
      aria-hidden="true"
      className={`mr-[var(--ui-p-6)] block size-[var(--ui-p-16)] shrink-0 rounded-full border border-[#72512a] shadow-[0_1px_2px_#49301888] ${status === "online" ? "bg-[radial-gradient(circle_at_33%_25%,#b9ff75,#38dc18_58%,#168c08)]" : "bg-[radial-gradient(circle_at_33%_25%,#e8e5d7,#9b9b92_58%,#6c706c)]"}`}
    />
  );
}

function formatSentTime(timestamp: number): string {
  const date = new Date(timestamp);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function formatMessageTime(timestamp: number, now: number): string {
  const messageDate = new Date(timestamp);
  const elapsed = Math.max(0, now - timestamp);
  if (elapsed < 24 * 60 * 60_000) {
    return formatSentTime(timestamp);
  }
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const weekday = weekdays[messageDate.getDay()];
  const currentDate = new Date(now);
  if (
    elapsed < 30 * 24 * 60 * 60_000 &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return weekday;
  }
  return `${weekday}, tháng ${messageDate.getMonth() + 1}`;
}

/** Database-backed messaging, with legacy local threads for offline previews. */
export function MessagesDialog({
  dialogRef,
  layout: incomingLayout,
  onClose,
  openRequest,
  onViewInfo,
  shareRoomId,
}: {
  shareRoomId?: string | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
  layout: ReturnType<typeof useRankingLayout>;
  onClose: () => void;
  openRequest?: MessageConversationRequest | null;
  onViewInfo: (name: string) => void;
}) {
  const [searchLayout, setSearchLayout] = useState<ReturnType<
    typeof useRankingLayout
  > | null>(null);
  const baseLayout = searchLayout ?? incomingLayout;
  const viewport = getAppViewportSize();
  const layout = baseLayout.compact
    ? baseLayout
    : {
        ...baseLayout,
        width: Math.min(
          baseLayout.width + 120,
          (viewport.width - 24) / baseLayout.scale,
        ),
      };
  const [inboxSettingsOpen, setInboxSettingsOpen] = useState(false);
  const inboxSettingsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!inboxSettingsOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !inboxSettingsRef.current?.contains(event.target)
      )
        setInboxSettingsOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    return () =>
      document.removeEventListener("pointerdown", closeOutside, true);
  }, [inboxSettingsOpen]);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(() => setInboxSettingsOpen(false));
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, [dialogRef]);
  const [inboxTab, setInboxTab] = useState<
    "all" | "invitations" | "friends" | "groups"
  >("all");
  useEffect(() => {
    if (shareRoomId) {
      setInboxTab("friends");
      setSelectedConversation(null);
    }
  }, [shareRoomId]);
  const groupInvitations = useGroupInvitations();
  const [now, setNow] = useState(() => Date.now());
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [selectedMessage, setSelectedMessage] = useState<
    number | string | null
  >(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useEffect(() => {
    setPreviewImage(null);
  }, [selectedConversation]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserName = useSessionStore((state) => state.name);
  const account = useSessionStore((s) => s.account);
  const databaseMessages = useDatabaseMessages();
  const [groupChatControls, setGroupChatControls] = useState({
    chatDisabled: false,
    deputyChatAllowed: false,
  });
  const databaseConversations = useRef<DatabaseConversation[]>([]);
  const databaseIds = useRef<Record<string, string>>({});
  const [groupApprovalRequired, setGroupApprovalRequired] = useState(false);
  const [pendingGroupMembers, setPendingGroupMembers] = useState<
    PendingGroupMember[]
  >([]);
  const [groupMemberRoles, setGroupMemberRoles] = useState<
    Record<string, GroupMemberRole>
  >({});
  const [blockedGroupMembers, setBlockedGroupMembers] = useState<
    BlockedGroupMember[]
  >([]);
  const selectedGroupKey = useRef("");
  selectedGroupKey.current =
    (account?.id ?? "local") + ":" + (selectedConversation ?? "");
  useEffect(() => {
    setGroupApprovalRequired(false);
    setPendingGroupMembers([]);
    setGroupMemberRoles({});
    setBlockedGroupMembers([]);
  }, [selectedConversation, account?.id]);
  const [databaseError, setDatabaseError] = useState("");

  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messageActionPending, setMessageActionPending] = useState(false);
  const currentAvatarIndex = useSessionStore((state) => state.avatarIndex);
  // Temporary preview requested by the user: the current account is a regular member.
  const [conversationList, setConversationList] = useState<ConversationItem[]>(
    () => {
      if (account) return [];
      const selfName = currentUserName || "Bạn";
      const creatorName = selfName === "MinhQuang" ? "LinhMeo99" : "MinhQuang";
      return [
        {
          name: memberPreviewGroupId,
          title: "Nhóm Kỳ Hữu",
          image: defaultGroupAvatar,
          status: "online",
          text: "Chào mừng bạn vào nhóm!",
          lastMessageAt: fixtureNow,
          isGroup: true,
          creatorName,
          members: [
            ...new Set([
              creatorName,
              selfName,
              "LinhMeo99",
              "FonGiaoSu",
              "TomCute",
            ]),
          ],
        },
        ...conversations,
      ];
    },
  );
  useEffect(() => {
    if (!shareRoomId) return;
    setConversationList((current) => [
      ...current,
      ...getMessageFriendContacts()
        .filter((contact) => !current.some((c) => c.name === contact.name))
        .map((contact) => ({ ...contact, text: "", lastMessageAt: 0 })),
    ]);
  }, [shareRoomId]);
  const memberImages = Object.fromEntries([
    ...getMessageFriendContacts().map((contact) => [
      contact.name,
      contact.image,
    ]),
    ...conversationList
      .filter((conversation) => !conversation.isGroup)
      .map((conversation) => [conversation.name, conversation.image]),
  ]) as Record<string, string>;
  const [nicknames, setNicknames] = useState<Record<string, string>>({});
  const [blockedAtByName, setBlockedAtByName] = useState<
    Record<string, number>
  >({});
  const [threads, setThreads] = useState<Record<string, MessageItem[]>>(() =>
    account
      ? {}
      : {
          ...initialThreads,
          [memberPreviewGroupId]: [
            {
              id: 1,
              text: "Chào mừng bạn vào nhóm!",
              outgoing: false,
              sentAt: fixtureNow,
            },
          ],
        },
  );
  // A few incoming fixture messages start unread so the badge can be previewed.
  const [lastReadAt, setLastReadAt] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      conversations.map((conversation) => [
        conversation.name,
        ["Picolozz", "Nguyễn Hoàng Minh Khôi", "An"].includes(conversation.name)
          ? 0
          : fixtureNow,
      ]),
    ),
  );
  const unreadCounts = account
    ? Object.fromEntries(
        databaseConversations.current.map((c) => [
          c.type === "direct" ? (c.peerName ?? c.id) : c.id,
          Number(c.unreadCount),
        ]),
      )
    : Object.fromEntries(
        conversationList.map((conversation) => [
          conversation.name,
          (threads[conversation.name] ?? []).filter(
            (message) =>
              !message.outgoing &&
              message.sentAt > (lastReadAt[conversation.name] ?? 0),
          ).length,
        ]),
      );
  useEffect(() => {
    if (!selectedConversation) return;
    const latestReceivedAt = (threads[selectedConversation] ?? []).reduce(
      (latest, message) =>
        message.outgoing ? latest : Math.max(latest, message.sentAt),
      0,
    );
    setLastReadAt((current) =>
      latestReceivedAt > (current[selectedConversation] ?? 0)
        ? { ...current, [selectedConversation]: latestReceivedAt }
        : current,
    );
  }, [selectedConversation, threads]);
  const [draft, setDraft] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiTriggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!emojiOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !emojiPickerRef.current?.contains(event.target) &&
        !emojiTriggerRef.current?.contains(event.target)
      )
        setEmojiOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside, true);
    return () =>
      document.removeEventListener("pointerdown", closeOutside, true);
  }, [emojiOpen]);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const draftInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setPendingImage(null);
    setEmojiOpen(false);
  }, [selectedConversation]);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [notificationMutes, setNotificationMutes] = useState<
    Record<string, { duration: NotificationMuteDuration; until: number }>
  >({});
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const groupTriggerRef = useRef<HTMLButtonElement>(null);
  const optionsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const nextMessageId = useRef(Date.now());
  const messageListRef = useRef<HTMLDivElement>(null);
  const conversationListRef = useRef<HTMLOListElement>(null);
  const [conversationRowHeight, setConversationRowHeight] = useState(0);
  const sentNotice = useInviteSentNotice();
  useEffect(() => {
    if (!databaseError) return;
    if (databaseError !== "Không tải được tin nhắn.")
      sentNotice.show(databaseError);
    setDatabaseError("");
  }, [databaseError, sentNotice.show]);
  useEffect(() => {
    const list = conversationListRef.current;
    if (!list) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0)
        setConversationRowHeight(entry.contentRect.height / 8);
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, []);
  const friendTriggerRef = useRef<HTMLButtonElement | null>(null);
  const nextGroupId = useRef(0);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!openRequest) return;
    const requestedAt = Date.now();
    setConversationList((current) => {
      const existing = current.find(
        (conversation) => conversation.name === openRequest.name,
      );
      const conversation = existing
        ? {
            ...existing,
            playerId: openRequest.playerId ?? existing.playerId,
            lastMessageAt: requestedAt,
          }
        : {
            name: openRequest.name,
            playerId: openRequest.playerId,
            image: openRequest.image ?? defaultAvatar,
            status: openRequest.status ?? "offline",
            text: "",
            lastMessageAt: requestedAt,
          };
      return [
        conversation,
        ...current.filter((item) => item.name !== openRequest.name),
      ];
    });
    setThreads((current) =>
      current[openRequest.name]
        ? current
        : { ...current, [openRequest.name]: [] },
    );
    setSelectedConversation(openRequest.name);
    setSelectedMessage(null);
    setSearchQuery("");
    setDraft("");
    setNow(requestedAt);
  }, [openRequest?.id]);
  const reloadDatabase = async () => {
    if (!account) return;
    const currentId = selectedConversation
      ? databaseIds.current[selectedConversation]
      : undefined;
    const [list, social] = await Promise.all([
      databaseMessages.list(),
      databaseMessages.social(),
    ]);
    const selectedItems =
      currentId && list.some((c) => c.id === currentId)
        ? await databaseMessages.messages(currentId).catch(() => null)
        : null;
    databaseConversations.current = list;
    const next: ConversationItem[] = list.map((c) => {
      const name = c.type === "direct" ? (c.peerName ?? c.id) : c.id;
      databaseIds.current[name] = c.id;
      return {
        name,
        title: c.title ?? undefined,
        playerId: c.peerId ?? undefined,
        image:
          c.type === "group"
            ? (c.avatarUrl ?? defaultGroupAvatar)
            : defaultAvatar,
        status: c.online ? "online" : "offline",
        text:
          c.preview && isMessageImage(c.preview) ? "📷 Ảnh" : (c.preview ?? ""),
        lastMessageAt: c.lastMessageAt
          ? new Date(c.lastMessageAt).getTime()
          : 0,
        isGroup: c.type === "group",
      };
    });

    setBlockedAtByName(
      Object.fromEntries(
        list
          .filter(
            (c) => c.peerId && social.blocks.some((b) => b.id === c.peerId),
          )
          .map((c) => [c.peerName ?? c.id, 0]),
      ),
    );
    setConversationList((current) =>
      next.map((conversation) => {
        const previous = current.find(
          (item) => item.name === conversation.name,
        );
        return conversation.isGroup
          ? {
              ...conversation,
              members: previous?.members,
              creatorName: previous?.creatorName,
            }
          : conversation;
      }),
    );
    if (
      selectedConversation &&
      !next.some((c) => c.name === selectedConversation) &&
      !openRequest
    ) {
      setSelectedConversation(null);
      setOptionsOpen(false);
    }
    setNotificationMutes(
      Object.fromEntries(
        list
          .filter(
            (c) =>
              Number(c.mutedIndefinitely) === 1 ||
              (c.mutedUntil && new Date(c.mutedUntil).getTime() > Date.now()),
          )
          .map((c) => {
            const until =
              Number(c.mutedIndefinitely) === 1
                ? Infinity
                : new Date(c.mutedUntil!).getTime();
            const hours = (until - Date.now()) / 3600000;
            return [
              c.type === "direct" ? (c.peerName ?? c.id) : c.id,
              {
                duration:
                  until === Infinity
                    ? "forever"
                    : hours > 4
                      ? 8
                      : hours > 1
                        ? 4
                        : 1,
                until,
              },
            ];
          }),
      ),
    );
    setNicknames(
      Object.fromEntries(
        list
          .filter((c) => c.nickname)
          .map((c) => [
            c.type === "direct" ? (c.peerName ?? c.id) : c.id,
            c.nickname!,
          ]),
      ),
    );
    for (const c of next.filter((c) => c.name === selectedConversation)) {
      const items =
        selectedItems ??
        (await databaseMessages.messages(databaseIds.current[c.name]));
      if (selectedConversation === c.name && items[0])
        void databaseMessages
          .read(databaseIds.current[c.name], items[0].id)
          .catch(() => {});
      const messages = items.reverse().map((m) => ({
        id: m.id,
        eventType: m.eventType,
        displayName: m.displayName,
        avatarCode: m.avatarCode,
        avatarFrameCode: m.avatarFrameCode,
        text: m.body,
        outgoing: m.senderId === account.id,
        sentAt: new Date(m.sentAt).getTime(),
      }));
      setThreads((current) => {
        const previous = current[c.name];
        if (
          previous?.length === messages.length &&
          previous.every(
            (message, index) =>
              message.id === messages[index].id &&
              message.text === messages[index].text &&
              message.outgoing === messages[index].outgoing &&
              message.sentAt === messages[index].sentAt,
          )
        )
          return current;
        return { ...current, [c.name]: messages };
      });
    }
    for (const group of next.filter(
      (c) => c.isGroup && c.name === selectedConversation,
    )) {
      void Promise.all([
        databaseMessages.members(databaseIds.current[group.name]),
        databaseMessages.settings(databaseIds.current[group.name]),
        databaseMessages.blocked(databaseIds.current[group.name]),
      ])
        .then(async ([members, settings, blocked]) => {
          const owner = members.find((m) => m.role === "owner");
          const pending =
            owner?.id === account.id
              ? await databaseMessages.pending(databaseIds.current[group.name])
              : [];
          if (selectedGroupKey.current !== account.id + ":" + group.name)
            return;
          setConversationList((current) =>
            current.map((c) =>
              c.name === group.name
                ? {
                    ...c,
                    members: members.map((m) => m.name),
                    creatorName: owner?.name,
                  }
                : c,
            ),
          );
          setGroupApprovalRequired(settings.approvalRequired);
          setGroupChatControls({
            chatDisabled: settings.chatDisabled,
            deputyChatAllowed: settings.deputyChatAllowed,
          });
          setPendingGroupMembers(pending);
          setGroupMemberRoles(
            Object.fromEntries(
              members.map((member) => [
                member.name,
                member.role as GroupMemberRole,
              ]),
            ),
          );
          setBlockedGroupMembers(blocked);
        })
        .catch(() => {});
    }
  };
  useEffect(() => {
    if (!account) return;
    let pending = false,
      cancelled = false,
      firstLoad = true;
    const load = () => {
      if (pending || !dialogRef.current?.open) return;
      pending = true;
      if (firstLoad) setMessagesLoading(true);
      void reloadDatabase()
        .catch(() => {
          if (!cancelled) setDatabaseError("Không tải được tin nhắn.");
        })
        .finally(() => {
          pending = false;
          firstLoad = false;
          if (!cancelled) setMessagesLoading(false);
        });
    };
    load();
    const timer = setInterval(load, 1000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [account?.id, selectedConversation]);
  useEffect(() => {
    if (!account || !openRequest) return;
    void databaseMessages
      .direct(openRequest.name)
      .then((id) => {
        databaseIds.current[openRequest.name] = id;
        return reloadDatabase();
      })
      .catch(() => setDatabaseError("Không mở được hội thoại."));
  }, [openRequest?.id, account?.id]);
  // HOVANG_DESKTOP_MESSAGE_LIST_UI_V1 - desktop-only conversation list adjustments
  // HOVANG_DESKTOP_MESSAGE_LIST_UI_V2 - avatar and text position refinement
  const sourceWidth =
    MESSAGE_PANEL_SIZE.left.width + MESSAGE_PANEL_SIZE.right.width;
  const sourceHeight = Math.max(
    MESSAGE_PANEL_SIZE.left.height,
    MESSAGE_PANEL_SIZE.right.height,
  );
  const scale = layout.compact
    ? Math.max(0.65, layout.scale * 1.5)
    : layout.scale;
  const expandedWidth = Math.round(layout.width * layout.scale);
  const leftWidth = Math.round(
    (expandedWidth * MESSAGE_PANEL_SIZE.left.width) / sourceWidth,
  );
  const panelHeight = (height: number) =>
    Math.round((layout.height * layout.scale * height) / sourceHeight);
  const shareContacts: ConversationItem[] = shareRoomId
    ? getMessageFriendContacts()
        .filter((f) => !conversationList.some((c) => c.name === f.name))
        .map((f) => ({ ...f, text: "", lastMessageAt: 0, isGroup: false }))
    : [];
  const selectableConversations = [...conversationList, ...shareContacts];
  const activeConversation = selectableConversations.find(
    (conversation) => conversation.name === selectedConversation,
  ) ?? {
    name: "",
    image: defaultAvatar,
    status: "offline" as const,
    text: "",
    lastMessageAt: 0,
  };
  const normalizedSearchQuery = normalizeSearchValue(searchQuery.trim());
  const searchedConversations = normalizedSearchQuery
    ? selectableConversations.filter((conversation) =>
        [
          conversation.name,
          conversation.title ?? "",
          nicknames[conversation.name] ?? "",
          conversation.playerId ?? "",
        ].some((value) =>
          normalizeSearchValue(value).includes(normalizedSearchQuery),
        ),
      )
    : selectableConversations;
  const visibleConversations = searchedConversations.filter(
    (c) => !shareRoomId || (inboxTab === "groups" ? c.isGroup : !c.isGroup),
  );
  const activeMessages = threads[activeConversation.name] ?? [];
  const blockedAt = blockedAtByName[activeConversation.name];
  const isBlocked = blockedAt !== undefined;
  const friendship = useMessageFriendship(
    activeConversation.name,
    sentNotice.show,
  );
  const cancelFriendRemoval = () => {
    friendship.cancelRemoval();
    const focusTarget = friendTriggerRef.current ?? optionsTriggerRef.current;
    focusTarget?.focus();
  };
  const confirmFriendRemoval = () => {
    friendship.confirmRemoval();
    const focusTarget = friendTriggerRef.current ?? optionsTriggerRef.current;
    focusTarget?.focus();
  };
  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) messageList.scrollTop = messageList.scrollHeight;
  }, [activeConversation.name, activeMessages.length]);
  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (shareRoomId && draft !== "Mời vào bàn: HOVANG_ROOM:" + shareRoomId) {
      sentNotice.show(
        "Link gửi không đúng. Vui lòng giữ nguyên mã chia sẻ bàn.",
      );
      return;
    }
    let text = draft.trim();
    if (shareRoomId && text === "Mời vào bàn: HOVANG_ROOM:" + shareRoomId) {
      const room = useSessionStore.getState().room;
      if (!room || room.id !== shareRoomId) {
        sentNotice.show("Phòng không còn tồn tại hoặc bạn đã rời phòng.");
        return;
      }
      setMessageActionPending(true);
      try {
        text = await createRoomShare(room);
      } catch (error) {
        setDatabaseError(errorMessage(error));
        return;
      } finally {
        setMessageActionPending(false);
      }
    }
    if (
      (!text && !pendingImage) ||
      !activeConversation.name ||
      messageActionPending
    )
      return;
    if (account) {
      setMessageActionPending(true);
      try {
        const id =
          databaseIds.current[activeConversation.name] ??
          (await databaseMessages.direct(activeConversation.name));
        databaseIds.current[activeConversation.name] = id;
        if (pendingImage) {
          await databaseMessages.sendImage(id, pendingImage, createClientId());
          setPendingImage(null);
        }
        if (text) await databaseMessages.send(id, text, createClientId());
        setDraft("");
        setDatabaseError("");
        await reloadDatabase().catch(() =>
          setDatabaseError("Tin đã gửi, chưa tải lại được hội thoại."),
        );
      } catch (error) {
        setDatabaseError(`Không gửi được tin nhắn: ${errorMessage(error)}`);
      } finally {
        setMessageActionPending(false);
      }
      return;
    }
    const sentAt = Date.now();
    const message = {
      id: nextMessageId.current++,
      text,
      outgoing: true,
      sentAt,
      blocked: isBlocked,
    };
    setThreads((current) => ({
      ...current,
      [activeConversation.name]: [
        ...(current[activeConversation.name] ?? []),
        message,
      ],
    }));
    setConversationList((current) => {
      const latestConversation = current.find(
        (conversation) => conversation.name === activeConversation.name,
      );
      if (!latestConversation) return current;
      return [
        { ...latestConversation, text, lastMessageAt: sentAt },
        ...current.filter(
          (conversation) => conversation.name !== activeConversation.name,
        ),
      ];
    });
    setNow(sentAt);
    setDraft("");
    setSelectedMessage(null);
  }
  async function handleCreateGroup(group: MessagesCreateGroupPayload) {
    if (account) {
      if (messageActionPending) return;
      setMessageActionPending(true);
      try {
        const id = await databaseMessages.group(
          group.name,
          group.members.filter((name) => name !== account.displayName),
        );
        await reloadDatabase();
        setConversationList((current) => {
          const created = current.find(
            (conversation) => conversation.name === id,
          );
          return created
            ? [
                created,
                ...current.filter((conversation) => conversation.name !== id),
              ]
            : current;
        });
        setSearchQuery("");
        setSelectedConversation(id);
        setCreateGroupOpen(false);
      } catch (error) {
        setDatabaseError(`Không tạo được nhóm: ${errorMessage(error)}`);
      } finally {
        setMessageActionPending(false);
      }
      return;
    }
    const name = `group:${Date.now()}:${nextGroupId.current++}`;
    const conversation: ConversationItem = {
      name,
      title: group.name,
      image: group.image,
      status: "offline",
      text: `${group.members.length} thành viên`,
      lastMessageAt: 0,
      isGroup: true,
      members: group.members,
      creatorName: currentUserName || "Bạn",
    };
    setConversationList((current) => [conversation, ...current]);
    setThreads((current) => ({ ...current, [name]: [] }));
    setSelectedConversation(name);
    setSelectedMessage(null);
    setSearchQuery("");
    setDraft("");
    setCreateGroupOpen(false);
  }
  function openOptions(event: MouseEvent<HTMLButtonElement>) {
    optionsTriggerRef.current = event.currentTarget;
    setEmojiOpen(false);
    if (layout.compact) draftInputRef.current?.blur();
    setOptionsOpen(true);
  }
  function dismissOptions() {
    setOptionsOpen(false);
    optionsTriggerRef.current?.focus();
  }
  function dismissCreateGroup() {
    setCreateGroupOpen(false);
    groupTriggerRef.current?.focus();
  }
  const optionsPanel = optionsOpen ? (
    <MessagesOptionsPanel
      chatDisabled={groupChatControls.chatDisabled}
      deputyChatAllowed={groupChatControls.deputyChatAllowed}
      onSetChat={async (chatDisabled, deputyChatAllowed) => {
        const id = databaseIds.current[activeConversation.name];
        if (account && id)
          await databaseMessages.setChat(id, chatDisabled, deputyChatAllowed);
        setGroupChatControls({ chatDisabled, deputyChatAllowed });
      }}
      onRemoveMember={async (name) => {
        const id = databaseIds.current[activeConversation.name];
        if (!id) throw new Error("Không tìm thấy nhóm.");
        await databaseMessages.removeMember(id, name);
        setConversationList((current) =>
          current.map((conversation) =>
            conversation.name === activeConversation.name
              ? {
                  ...conversation,
                  members: conversation.members?.filter(
                    (member) => member !== name,
                  ),
                }
              : conversation,
          ),
        );
      }}
      memberRoles={groupMemberRoles}
      blockedMembers={blockedGroupMembers}
      onBlockMember={async (name, blocked) => {
        if (account) {
          const id = databaseIds.current[activeConversation.name];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.manageMember(
            id,
            name,
            blocked ? "block-member" : "unblock-member",
          );
        }
        setBlockedGroupMembers((current) =>
          blocked
            ? [
                ...current.filter((member) => member.name !== name),
                { id: name, name },
              ]
            : current.filter((member) => member.name !== name),
        );
      }}
      onSetDeputy={async (name, enabled) => {
        if (account) {
          const id = databaseIds.current[activeConversation.name];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.manageMember(
            id,
            name,
            enabled ? "promote-deputy" : "demote-deputy",
          );
        }
        setGroupMemberRoles((current) => ({
          ...current,
          [name]: enabled ? "deputy" : "member",
        }));
      }}
      approvalRequired={groupApprovalRequired}
      pendingMembers={pendingGroupMembers}
      onSetApproval={async (enabled) => {
        if (account) {
          const id = databaseIds.current[activeConversation.name];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.setApproval(id, enabled);
        }
        setGroupApprovalRequired(enabled);
      }}
      onInviteMember={async (name) => {
        const groupName = activeConversation.name;
        let pendingApproval =
          groupApprovalRequired &&
          activeConversation.creatorName !== currentUserName;
        if (account) {
          const id = databaseIds.current[groupName];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          const result = await databaseMessages.invite(id, name);
          pendingApproval = Boolean(result.pendingApproval);
        }
        if (!pendingApproval)
          setConversationList((current) =>
            current.map((c) =>
              c.name === groupName
                ? { ...c, members: [...new Set([...(c.members ?? []), name])] }
                : c,
            ),
          );
        else if (!account)
          setPendingGroupMembers((current) => [
            ...current.filter((m) => m.name !== name),
            { id: name, name, inviterName: currentUserName },
          ]);
        return { pendingApproval };
      }}
      onReviewMember={async (id, accepted) => {
        const target = pendingGroupMembers.find((m) => m.id === id);
        const groupName = activeConversation.name;
        if (account) {
          const groupId = databaseIds.current[groupName];
          if (!groupId) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.member(
            groupId,
            accepted ? "approve" : "reject",
            id,
          );
        }
        setPendingGroupMembers((current) => current.filter((m) => m.id !== id));
        if (accepted && target)
          setConversationList((current) =>
            current.map((c) =>
              c.name === groupName
                ? {
                    ...c,
                    members: [...new Set([...(c.members ?? []), target.name])],
                  }
                : c,
            ),
          );
      }}
      onRenameGroup={async (name) => {
        const groupName = activeConversation.name;
        if (account) {
          const id = databaseIds.current[groupName];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.title(id, name);
        }
        setConversationList((current) =>
          current.map((c) =>
            c.name === groupName ? { ...c, title: name } : c,
          ),
        );
      }}
      onTransferOwner={async (name) => {
        const groupName = activeConversation.name;
        if (account) {
          const id = databaseIds.current[groupName];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.transferOwner(id, name);
        }
        setGroupMemberRoles((current) => ({
          ...current,
          [currentUserName]: "member",
          [name]: "owner",
        }));
        setConversationList((current) =>
          current.map((c) =>
            c.name === groupName ? { ...c, creatorName: name } : c,
          ),
        );
      }}
      onDissolveGroup={async () => {
        const groupName = activeConversation.name;
        if (account) {
          const id = databaseIds.current[groupName];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.member(id, "dissolve");
          delete databaseIds.current[groupName];
        }
        setConversationList((current) =>
          current.filter((c) => c.name !== groupName),
        );
        setSelectedConversation(null);
        setOptionsOpen(false);
      }}
      onLeaveGroup={async () => {
        const groupName = activeConversation.name;
        if (account) {
          const id = databaseIds.current[groupName];
          if (!id) throw new Error("Không tìm thấy nhóm.");
          await databaseMessages.member(id, "leave");
          delete databaseIds.current[groupName];
        }
        setConversationList((current) =>
          current.filter((conversation) => conversation.name !== groupName),
        );
        setThreads((current) => {
          const next = { ...current };
          delete next[groupName];
          return next;
        });
        setSelectedConversation(null);
        setSelectedMessage(null);
        setOptionsOpen(false);
      }}
      onMemberInfo={onViewInfo}
      uiScale={
        layout.compact
          ? (scale *
              Math.min(
                expandedWidth * 0.96,
                (panelHeight(sourceHeight) * 0.94 * 894) / 1008,
              )) /
            Math.min(
              expandedWidth * 0.8,
              (panelHeight(sourceHeight) * 0.92 * 894) / 1008,
            )
          : undefined
      }
      width={
        layout.compact
          ? expandedWidth
          : Math.min(expandedWidth * 0.9, ((viewport.height - 48) * 894) / 1008)
      }
      height={
        layout.compact
          ? panelHeight(sourceHeight)
          : (Math.min(
              expandedWidth * 0.9,
              ((viewport.height - 48) * 894) / 1008,
            ) *
              1008) /
            894
      }
      image={activeConversation.image}
      accountName={account ? activeConversation.name : undefined}
      name={
        nicknames[activeConversation.name] ||
        activeConversation.title ||
        activeConversation.name
      }
      nicknameValue={nicknames[activeConversation.name] ?? ""}
      isBlocked={isBlocked}
      notificationMuteDuration={
        notificationMutes[activeConversation.name]?.until > now
          ? notificationMutes[activeConversation.name].duration
          : 1
      }
      onSaveNotificationMute={(duration) => {
        if (account)
          void databaseMessages
            .mute(
              databaseIds.current[activeConversation.name],
              duration === "forever" ? null : duration,
            )
            .catch(() => setDatabaseError("Không lưu được tắt thông báo."));
        setNotificationMutes((current) => ({
          ...current,
          [activeConversation.name]: {
            duration,
            until:
              duration === "forever"
                ? Infinity
                : Date.now() + duration * 60 * 60 * 1000,
          },
        }));
      }}
      isGroup={Boolean(activeConversation.isGroup)}
      members={activeConversation.members ?? []}
      memberImages={memberImages}
      creatorName={
        activeConversation.creatorName ?? activeConversation.members?.[0]
      }
      memberRowHeight={conversationRowHeight}
      memberListWidth={leftWidth}
      selfName={currentUserName || "Bạn"}
      selfAvatarIndex={currentAvatarIndex}
      onChangeGroupImage={(nextImage) => {
        if (account) {
          void databaseMessages
            .avatar(databaseIds.current[activeConversation.name], nextImage)
            .then((url) => {
              setConversationList((current) =>
                current.map((conversation) =>
                  conversation.name === activeConversation.name
                    ? { ...conversation, image: url }
                    : conversation,
                ),
              );
            })
            .catch((error) => setDatabaseError(errorMessage(error)));
          return;
        }
        setConversationList((current) =>
          current.map((conversation) =>
            conversation.name === activeConversation.name
              ? { ...conversation, image: nextImage }
              : conversation,
          ),
        );
      }}
      onToggleBlock={(blocked) => {
        if (account) {
          const c = databaseConversations.current.find(
            (c) => c.id === databaseIds.current[activeConversation.name],
          );
          if (c?.peerId)
            void databaseMessages
              .block(c.peerId, blocked)
              .catch(() =>
                setDatabaseError("Không cập nhật được chặn tin nhắn."),
              );
        }
        setBlockedAtByName((current) => {
          if (blocked)
            return { ...current, [activeConversation.name]: Date.now() };
          const next = { ...current };
          delete next[activeConversation.name];
          return next;
        });
      }}
      onBack={dismissOptions}
      onViewInfo={() => {
        setOptionsOpen(false);
        onViewInfo(activeConversation.name);
      }}
      onSaveNickname={(value) => {
        if (account) {
          void (
            activeConversation.isGroup
              ? databaseMessages.title(
                  databaseIds.current[activeConversation.name],
                  value,
                )
              : databaseMessages.member(
                  databaseIds.current[activeConversation.name],
                  "nickname",
                  value,
                )
          )
            .then(reloadDatabase)
            .catch(() => setDatabaseError(""));
          return;
        }
        setNicknames((current) => {
          if (!value) {
            const next = { ...current };
            delete next[activeConversation.name];
            return next;
          }
          return { ...current, [activeConversation.name]: value };
        });
      }}
      onDeleteConversation={() => {
        if (account) {
          void databaseMessages
            .member(databaseIds.current[activeConversation.name], "clear")
            .then(reloadDatabase)
            .catch(() => setDatabaseError("Không xóa được cuộc trò chuyện."));
          setOptionsOpen(false);
          return;
        }
        const deletedName = activeConversation.name;
        setConversationList((current) =>
          current.map((conversation) =>
            conversation.name === deletedName
              ? { ...conversation, text: "", lastMessageAt: 0 }
              : conversation,
          ),
        );
        setThreads((current) => ({ ...current, [deletedName]: [] }));
        setSelectedConversation(deletedName);
        setSelectedMessage(null);
        setDraft("");
        setOptionsOpen(false);
        optionsTriggerRef.current?.focus();
      }}
    />
  ) : null;
  return (
    <dialog
      ref={dialogRef}
      onPointerDownCapture={(event) => {
        if (
          layout.compact &&
          !(event.target as HTMLElement).closest("[data-message-composer]")
        ) {
          draftInputRef.current?.blur();
          setEmojiOpen(false);
        }
      }}
      onFocusCapture={(event) => {
        if (
          layout.compact &&
          !searchLayout &&
          event.target instanceof HTMLInputElement
        )
          setSearchLayout(layout);
      }}
      aria-label="Tin nhắn"
      onClose={() => {
        setPreviewImage(null);
        setSelectedConversation(null);
        setSearchQuery("");
        setSearchLayout(null);
      }}
      onCancel={(event) => {
        event.preventDefault();
        if (friendship.removalName) cancelFriendRemoval();
        else if (createGroupOpen) dismissCreateGroup();
        else if (optionsOpen) dismissOptions();
        else if (layout.compact && selectedConversation)
          setSelectedConversation(null);
        else onClose();
      }}
      className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#ffebba] backdrop:bg-black/45"
      style={
        {
          ...getCrispUiLayout(scale),
          width: expandedWidth,
          height: Math.round(layout.height * layout.scale),
          "--ui-p-45": `${Math.round(45 * scale)}px`,
          "--ui-p-70": `${Math.round(70 * scale)}px`,
        } as CSSProperties
      }
    >
      {!(layout.compact && createGroupOpen) && (
        <div className="absolute inset-0 z-10 isolate">
          <MessagesDialogSurface
            compact={layout.compact}
            activeChat={layout.compact && !!selectedConversation}
            layout={layout}
            onClose={layout.compact && optionsOpen ? dismissOptions : onClose}
          >
            <div className="relative z-10 flex min-h-0 flex-1 w-full items-start desktop:gap-3 border-0 bg-transparent p-0 shadow-none">
              {(messagesLoading || messageActionPending) && (
                <HovangLoadingOverlay label="Đang tải tin nhắn" />
              )}
              <MessagesSidebar
                compact={layout.compact}
                hidden={layout.compact && !!selectedConversation}
                width={layout.compact ? expandedWidth : leftWidth}
                height={panelHeight(MESSAGE_PANEL_SIZE.left.height)}
              >
                <div className="mb-3 flex w-full shrink-0 items-center gap-1 compact:gap-2">
                  <div
                    ref={inboxSettingsRef}
                    className="relative z-30 order-2 shrink-0"
                  >
                    <button
                      data-ui-selection-sound
                      ref={groupTriggerRef}
                      type="button"
                      aria-label="Cài đặt Tin nhắn"
                      aria-expanded={inboxSettingsOpen}
                      onClick={() =>
                        setInboxSettingsOpen((current) => !current)
                      }
                      className={`${buttonInteraction} grid size-[calc(var(--ui-p-50)*0.9)] compact:size-[44px] place-items-center border-0 bg-transparent p-0 text-[#f4c75e]`}
                    >
                      <SettingsIcon className="size-[28px]" />
                    </button>
                    {inboxSettingsOpen && (
                      <div className="absolute right-0 top-full z-40 w-[240px] max-w-[calc(100vw-48px)] rounded-lg border border-[#9f6025] bg-[#281205] p-2">
                        <button
                          type="button"
                          data-ui-selection-sound
                          onClick={() => {
                            setInboxSettingsOpen(false);
                            if (layout.compact && !searchLayout)
                              setSearchLayout(layout);
                            setCreateGroupOpen(true);
                          }}
                          className={`${buttonInteraction} w-full border-0 bg-transparent p-3 text-left text-[#ffe8ad]`}
                        >
                          Tạo nhóm
                        </button>
                      </div>
                    )}
                  </div>
                  <label
                    style={searchFieldMetrics(
                      layout.compact ? "44px" : "calc(var(--ui-p-50) * 1.14)",
                      layout.compact,
                    )}
                    className={
                      layout.compact
                        ? `order-1 my-0 flex h-[44px] min-w-0 flex-1 items-center gap-[6px] px-[10px] ${messagesFriendsField}`
                        : `order-1 my-0 flex h-[calc(var(--ui-p-50)*1.14)] min-w-0 flex-1 items-center gap-1 px-2 ${messagesFriendsField}`
                    }
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-[var(--ui-p-24)] shrink-0"
                      fill="none"
                      stroke="#e5b45d"
                      strokeWidth="2"
                    >
                      <circle cx="10" cy="10" r="7" />
                      <path d="m15 15 7 7" />
                    </svg>
                    <span className="relative flex min-w-0 flex-1 items-center">
                      <input
                        aria-label="Tìm tên hoặc ID người chơi"
                        onFocus={() => {
                          if (layout.compact && !searchLayout)
                            setSearchLayout(layout);
                        }}
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder={
                          layout.compact
                            ? "Nhập tên / ID người chơi..."
                            : "Tìm tên hoặc ID người chơi"
                        }
                        className={
                          layout.compact
                            ? `w-full ${messagesFriendsInput} ${searchFieldTextSize}`
                            : `w-full ${messagesFriendsInput} ${searchFieldTextSize}`
                        }
                      />
                    </span>
                  </label>
                </div>
                <div
                  className={`${socialPanelClass} flex min-h-0 flex-1 flex-col`}
                  style={{
                    paddingInline: Math.round(
                      (layout.compact ? 20 : 6) * layout.scale,
                    ),
                    borderWidth: Math.round(3 * layout.scale),
                    borderRadius: Math.round(14 * layout.scale),
                    backgroundImage: `linear-gradient(#fff4dc52,#fff4dc52), url(${historyParchmentBackground})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  {inboxTab !== "invitations" ? (
                    <ol
                      ref={conversationListRef}
                      className={`m-0 flex min-h-0 flex-1 flex-col overflow-y-auto p-0 pr-1 gap-[4px] compact:gap-[6px] ${messageScrollbarClass}`}
                    >
                      {!messagesLoading &&
                        !messageActionPending &&
                        visibleConversations.length === 0 && (
                          <li className="grid min-h-0 flex-1 place-items-center p-4 text-center text-[#624622]">
                            {normalizedSearchQuery
                              ? "Không tìm thấy tin nhắn"
                              : "Danh sách tin nhắn trống"}
                          </li>
                        )}
                      {visibleConversations.map((item) => (
                        <li
                          key={item.name}
                          style={
                            layout.compact
                              ? {
                                  ...getSocialRowStyle(layout.scale, true),
                                  height: "calc((100% - 36px) / 7)",
                                  minHeight: 0,
                                  flex: "0 0 calc((100% - 36px) / 7)",
                                  paddingInline:
                                    Math.round(12 * layout.scale * 1.5) + 5,
                                }
                              : {
                                  ...getSocialRowStyle(layout.scale, false),
                                  height: Math.round(90 * layout.scale),
                                  minHeight: Math.round(90 * layout.scale),
                                }
                          }
                          className={`${socialPlayerRowClass} compact:[container-type:size]`}
                        >
                          {layout.compact && (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-y-0 left-0 z-0 bg-[linear-gradient(90deg,#4a261327_0%,#75451d1a_55%,transparent_100%)] shadow-[inset_9px_0_14px_-11px_#24100635]"
                              style={{
                                width: Math.round(132 * layout.scale * 1.5),
                              }}
                            />
                          )}
                          {selectedConversation === item.name && (
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none absolute inset-0 rounded-lg ${layout.compact ? `border-2 border-[#ffe08b] ${messageSelectionHighlight}` : "border border-[#ffe08b]/70 bg-black/10"}`}
                            />
                          )}
                          <button
                            data-ui-tab-sound
                            type="button"
                            onClick={() => {
                              setSelectedConversation(item.name);
                              setSelectedMessage(null);
                              if (shareRoomId)
                                setDraft(
                                  "Mời vào bàn: HOVANG_ROOM:" + shareRoomId,
                                );
                            }}
                            aria-pressed={selectedConversation === item.name}
                            className="relative flex w-full min-w-0 flex-1 compact:h-full items-center justify-start gap-2 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-[#ffe08b]"
                          >
                            {item.isGroup ? (
                              <MessagesGroupAvatar
                                src={item.image}
                                alt=""
                                className="size-[calc(var(--ui-p-50)*1.10)] compact:size-[72cqh] shrink-0 cursor-pointer"
                              />
                            ) : (
                              <MessageAccountAvatar
                                name={item.name}
                                className="size-[calc(var(--ui-p-50)*1.10)] compact:size-[72cqh]"
                              />
                            )}
                            <div className="min-w-0 flex-1 overflow-hidden text-left compact:ml-[7px] compact:self-center">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="flex min-w-0 items-center gap-1.5 truncate font-heading text-[length:var(--ui-p-24)] font-bold text-[#251506] compact:text-[29.5cqh] compact:leading-[36cqh] compact:text-[#251506]">
                                  {item.isGroup && (
                                    <svg
                                      aria-hidden="true"
                                      viewBox="0 0 24 24"
                                      className="block size-[1em] shrink-0 self-center text-[#f4c75e]"
                                      fill="currentColor"
                                    >
                                      <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm14 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM12 10c-3 0-5 1.5-5 4v6h10v-6c0-2.5-2-4-5-4ZM5 12c-2.5 0-4 1.5-4 3.5V19h4v-5c0-.7.1-1.4.4-2H5Zm14 0h-.4c.3.6.4 1.3.4 2v5h4v-3.5c0-2-1.5-3.5-4-3.5Z" />
                                    </svg>
                                  )}
                                  <span className="min-w-0 truncate">
                                    <SocialPlayerName
                                      name={
                                        nicknames[item.name] ||
                                        item.title ||
                                        item.name
                                      }
                                    />
                                  </span>
                                </span>
                                {layout.compact && item.lastMessageAt > 0 && (
                                  <span className="shrink-0 whitespace-nowrap font-number text-[23cqh] leading-[36cqh] lining-nums tabular-nums text-[#76552e]">
                                    {formatMessageTime(item.lastMessageAt, now)}
                                  </span>
                                )}
                                {!layout.compact && (
                                  <>
                                    {unreadCounts[item.name] > 0 ? (
                                      <span
                                        aria-label={`${unreadCounts[item.name]} tin nhắn chưa đọc`}
                                        className="grid size-[var(--ui-p-28)] shrink-0 place-items-center rounded-full border-2 border-[#ffe2a1] bg-[#d82323] font-number lining-nums tabular-nums text-[length:var(--ui-p-15)] font-semibold leading-none text-white opacity-[0.88] shadow-[0_1px_4px_#321407]"
                                      >
                                        {unreadCounts[item.name] > 99
                                          ? "99+"
                                          : unreadCounts[item.name]}
                                      </span>
                                    ) : (
                                      item.lastMessageAt > 0 && (
                                        <span className="shrink-0 whitespace-nowrap font-number lining-nums tabular-nums text-[length:var(--ui-p-16)] compact:ml-auto compact:text-[14px] text-[#76552e] compact:text-[#76552e]">
                                          {formatMessageTime(
                                            item.lastMessageAt,
                                            now,
                                          )}
                                        </span>
                                      )
                                    )}
                                  </>
                                )}
                              </div>

                              <p className="relative -top-[2px] compact:top-0 mt-1 compact:mt-0 flex min-h-[var(--ui-p-20)] compact:min-h-[33cqh] min-w-0 items-center justify-start gap-2 text-left text-[length:var(--ui-p-21)] compact:text-[26cqh] compact:leading-[33cqh] text-[#624622] compact:text-[#624622]">
                                {!item.isGroup && (
                                  <span className="shrink-0 compact:[--ui-p-16:20cqh] compact:[--ui-p-6:6cqh]">
                                    <Dot status={item.status} />
                                  </span>
                                )}
                                <span
                                  className={`min-w-0 flex-1 truncate ${layout.compact && unreadCounts[item.name] > 0 ? "font-semibold text-[#36200c]" : ""}`}
                                >
                                  {isMessageImage(item.text) ||
                                  item.text === "📷 Ảnh" ? (
                                    <span className="flex min-w-0 items-center gap-[0.35em]">
                                      <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="block size-[1em] shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M3 6h4l2-3h6l2 3h4v15H3Z" />
                                        <circle cx="12" cy="13" r="4" />
                                      </svg>
                                      <span className="min-w-0 truncate">
                                        Ảnh
                                      </span>
                                    </span>
                                  ) : (
                                    <NumberText
                                      text={
                                        item.text ||
                                        (layout.compact && !item.isGroup
                                          ? item.status === "online"
                                            ? "Đang online"
                                            : "Offline"
                                          : "")
                                      }
                                    />
                                  )}
                                </span>
                                {layout.compact &&
                                  unreadCounts[item.name] > 0 && (
                                    <span
                                      aria-label={`${unreadCounts[item.name]} tin nhắn chưa đọc`}
                                      className="grid h-[39cqh] min-w-[39cqh] shrink-0 place-items-center rounded-full border border-[#ffe2a1] bg-[#d82323] px-[6.5cqh] font-number text-[22cqh] leading-none text-white"
                                    >
                                      {unreadCounts[item.name] > 99
                                        ? "99+"
                                        : unreadCounts[item.name]}
                                    </span>
                                  )}
                              </p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <MessagesInboxInvitations
                      compact={layout.compact}
                      scale={layout.scale}
                      invitations={groupInvitations.data ?? []}
                      loading={groupInvitations.isPending}
                      loadError={groupInvitations.isError}
                      onChanged={async () => {
                        await reloadDatabase();
                      }}
                    />
                  )}
                </div>
                <nav
                  aria-label="Danh mục Tin nhắn"
                  className="mt-1 flex shrink-0 border-t border-[#b8873e] pt-1"
                >
                  {(shareRoomId
                    ? ([
                        { key: "friends", label: "Cá nhân" },
                        { key: "groups", label: "Nhóm" },
                      ] as const)
                    : ([
                        { key: "all", label: "Tất cả" },
                        { key: "invitations", label: "Lời mời" },
                      ] as const)
                  ).map((tab) => (
                    <button
                      key={tab.key}
                      data-ui-selection-sound
                      type="button"
                      aria-pressed={inboxTab === tab.key}
                      onClick={() => {
                        setInboxTab(tab.key);
                        setSelectedConversation(null);
                      }}
                      className={`${buttonInteraction} relative flex-1 border-0 border-b-2 bg-transparent py-1 compact:py-2 text-[18px] compact:text-[18px] ${inboxTab === tab.key ? "border-[#f4c75e] text-[#f4c75e]" : "border-transparent text-[#ffe5a6]"}`}
                    >
                      {tab.label}
                      {tab.key === "invitations" && (
                        <MessagesInvitationBadge
                          count={groupInvitations.data?.length ?? 0}
                          corner
                        />
                      )}
                    </button>
                  ))}
                </nav>
              </MessagesSidebar>
              <MessagesChatPane
                compact={layout.compact}
                hidden={layout.compact && !selectedConversation}
                width={
                  layout.compact ? expandedWidth : expandedWidth - leftWidth
                }
                height={panelHeight(MESSAGE_PANEL_SIZE.right.height)}
              >
                {!activeConversation.name ? (
                  <div className="grid h-full w-full place-items-center p-6 text-center">
                    <span className="font-georgia text-[length:var(--ui-p-48)] leading-none font-bold whitespace-nowrap text-[#FFF6DF] italic">
                      HOVANG
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex h-[var(--ui-p-76)] compact:h-[54px] compact:min-h-[54px] compact:pr-[6px] compact:pl-[6px] compact:gap-[8px] shrink-0 items-center gap-3 border-b border-[#d39a42] bg-[linear-gradient(135deg,#3e200e,#1c0e07)] px-3">
                      {layout.compact && (
                        <MessagesBackButton
                          onClick={() => {
                            setSelectedConversation(null);
                            setOptionsOpen(false);
                          }}
                          label="Quay lại danh sách tin nhắn"
                        />
                      )}
                      <button
                        type="button"
                        data-ui-selection-sound
                        onClick={openOptions}
                        aria-label={`Mở tùy chọn với ${activeConversation.title || activeConversation.name}`}
                        className="m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none"
                      >
                        {activeConversation.isGroup ? (
                          <MessagesGroupAvatar
                            src={activeConversation.image}
                            alt={`Avatar ${activeConversation.title || activeConversation.name}`}
                            className="size-[calc(var(--ui-p-66)*0.78)] compact:size-[34px] shrink-0 cursor-pointer"
                          />
                        ) : (
                          <MessageAccountAvatar
                            name={activeConversation.name}
                            className="size-[calc(var(--ui-p-66)*0.78)] compact:size-[34px]"
                          />
                        )}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="font-heading text-[length:var(--ui-p-28)] font-light compact:font-bold text-[#ffe08b]">
                          <SocialPlayerName
                            name={
                              nicknames[activeConversation.name] ||
                              activeConversation.title ||
                              activeConversation.name
                            }
                          />
                        </p>
                        {!activeConversation.isGroup && (
                          <p className="flex items-center gap-2 text-[length:var(--ui-p-18)] text-[#e2c79f]">
                            <span className="shrink-0 compact:[--ui-p-16:12px] compact:[--ui-p-6:2px]">
                              <Dot status={activeConversation.status} />
                            </span>
                            {activeConversation.status === "online"
                              ? "Đang hoạt động"
                              : "Offline"}
                          </p>
                        )}
                      </div>
                      {!activeConversation.isGroup && (
                        <MessagesFriendButton
                          name={activeConversation.name}
                          isFriend={friendship.isFriend}
                          pending={friendship.pending}
                          incoming={friendship.incoming}
                          onClick={(event) => {
                            friendTriggerRef.current = event.currentTarget;
                            friendship.activate();
                          }}
                        />
                      )}
                      <button
                        type="button"
                        data-ui-selection-sound
                        onClick={openOptions}
                        aria-label="Tùy chọn hội thoại"
                        className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}
                      >
                        <CrispUiImage
                          src={more}
                          alt=""
                          className="block size-[var(--ui-p-42)] compact:size-[26px] object-contain"
                        />
                      </button>
                    </div>
                    <div
                      ref={messageListRef}
                      aria-busy={messagesLoading || messageActionPending}
                      className="relative flex min-h-0 flex-1 flex-col justify-start gap-2 compact:gap-[10px] overflow-x-hidden overflow-y-auto bg-black/45 desktop:bg-transparent p-3 "
                    >
                      {activeMessages.map((item, index) =>
                        item.eventType === "group-left" &&
                        activeConversation.isGroup ? (
                          <div
                            key={item.id}
                            className="flex w-full shrink-0 justify-center py-2"
                          >
                            <div className="flex max-w-full flex-wrap items-center justify-center gap-2 rounded-xl bg-black/60 px-3 py-2 text-center text-[length:var(--ui-p-18)] text-[#ffe8ba] compact:text-[14px]">
                              <span className="relative block size-[var(--ui-p-32)] shrink-0 compact:size-[28px]">
                                <AccountAvatar
                                  avatarCode={item.avatarCode}
                                  avatarFrameCode={item.avatarFrameCode}
                                />
                              </span>
                              <span className="min-w-0 break-words">
                                <NumberText
                                  text={item.displayName ?? ""}
                                  soften={false}
                                />{" "}
                                đã rời nhóm
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div key={item.id} className="shrink-0">
                            {index > 0 &&
                              item.sentAt - activeMessages[index - 1].sentAt >=
                                10 * 60_000 && (
                                <p className="mb-2 text-center text-[length:var(--ui-p-20)] text-[#fff6df] [text-shadow:0_1px_3px_#160904]">
                                  <time
                                    dateTime={new Date(
                                      item.sentAt,
                                    ).toISOString()}
                                  >
                                    {formatSentTime(item.sentAt)}
                                  </time>
                                </p>
                              )}
                            <div
                              className={`flex items-center gap-3 compact:gap-[15px] ${item.outgoing ? "justify-end compact:pr-[3px]" : ""}`}
                            >
                              {parseRoomShare(item.text) ? (
                                <span
                                  className={`relative block size-[var(--ui-p-48)] compact:size-[32px] shrink-0 ${item.outgoing ? "hidden" : ""}`}
                                >
                                  <AccountAvatar
                                    avatarCode={
                                      item.outgoing
                                        ? account?.avatarCode
                                        : item.avatarCode
                                    }
                                    avatarFrameCode={
                                      item.outgoing
                                        ? account?.avatarFrameCode
                                        : item.avatarFrameCode
                                    }
                                  />
                                </span>
                              ) : (
                                !item.outgoing &&
                                (activeConversation.isGroup ? (
                                  <MessagesGroupAvatar
                                    src={activeConversation.image}
                                    alt=""
                                    className="size-[var(--ui-p-48)] compact:size-[32px] shrink-0 cursor-pointer"
                                  />
                                ) : (
                                  <MessageAccountAvatar
                                    name={activeConversation.name}
                                    className="size-[var(--ui-p-48)] compact:size-[32px]"
                                  />
                                ))
                              )}
                              <div
                                className={
                                  parseRoomShare(item.text)
                                    ? "min-w-0 max-w-full desktop:w-[92%] desktop:max-w-[calc(100%-64px)] desktop:flex-none"
                                    : "min-w-0 max-w-[85%]"
                                }
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (parseRoomShare(item.text)) {
                                      const roomId = parseRoomShare(
                                        item.text,
                                      )!.id;
                                      const current =
                                        useSessionStore.getState();
                                      if (current.room?.id === roomId) {
                                        sentNotice.show(
                                          "Đang trong phòng hiện tại.",
                                        );
                                        return;
                                      }
                                      if (
                                        current.room?.game.phase ===
                                          "playing" &&
                                        current.room.players.some((p) =>
                                          current.account
                                            ? p.userId === current.account.id
                                            : p.name === current.name,
                                        )
                                      ) {
                                        sentNotice.show(
                                          "Bạn đang đấu, không thể chuyển sang phòng khác.",
                                        );
                                        return;
                                      }
                                      void (async () => {
                                        if (current.room)
                                          await roomSocket.leave();
                                        try {
                                          return await roomSocket.join(
                                            roomId,
                                            current.name,
                                          );
                                        } catch (error) {
                                          if (current.room)
                                            useSessionStore
                                              .getState()
                                              .leave(errorMessage(error));
                                          throw error;
                                        }
                                      })()
                                        .then((room) => {
                                          useSessionStore
                                            .getState()
                                            .enterOnline(room);
                                          onClose();
                                        })
                                        .catch((error) => {
                                          const message = errorMessage(error);
                                          sentNotice.show(
                                            /không.*tồn tại|not found/i.test(
                                              message,
                                            )
                                              ? "Phòng không còn tồn tại."
                                              : message,
                                          );
                                        });
                                    } else if (isMessageImage(item.text))
                                      setPreviewImage(item.text);
                                    else
                                      setSelectedMessage((current) =>
                                        current === item.id ? null : item.id,
                                      );
                                  }}
                                  aria-label={
                                    isMessageImage(item.text)
                                      ? "Phóng to ảnh trong tin nhắn"
                                      : undefined
                                  }
                                  aria-haspopup={
                                    isMessageImage(item.text)
                                      ? "dialog"
                                      : undefined
                                  }
                                  aria-expanded={
                                    isMessageImage(item.text)
                                      ? undefined
                                      : selectedMessage === item.id
                                  }
                                  aria-controls={
                                    isMessageImage(item.text)
                                      ? undefined
                                      : `message-time-${item.id}`
                                  }
                                  className={
                                    parseRoomShare(item.text)
                                      ? "m-0 block w-full max-w-full cursor-pointer border-0 bg-transparent p-0 text-left leading-none shadow-none"
                                      : isMessageImage(item.text)
                                        ? "m-0 block h-fit w-fit max-w-full cursor-pointer border-0 bg-transparent p-0 leading-none shadow-none"
                                        : `relative block max-w-full cursor-pointer rounded-[var(--ui-p-12)] border-[length:var(--ui-p-2)] border-[#dca44d] px-6 py-2 compact:px-[12px] compact:py-[8px] text-left shadow-[inset_0_0_0_1px_#ffe08b55,0_2px_3px_#16090488] ${item.outgoing ? "bg-[linear-gradient(135deg,#ffe5a6,#efc67f)] text-[#241309]" : "bg-[linear-gradient(135deg,#3e200eef,#613014ee)] text-[#fff6df]"}`
                                  }
                                >
                                  {!parseRoomShare(item.text) &&
                                    !isMessageImage(item.text) && (
                                      <span
                                        aria-hidden="true"
                                        className={`absolute top-[var(--ui-p-12)] size-[var(--ui-p-10)] rotate-45 border-[#dca44d] ${item.outgoing ? "-right-[var(--ui-p-6)] border-t border-r bg-[#efc67f]" : "-left-[var(--ui-p-6)] border-b border-l bg-[#3e200e]"}`}
                                      />
                                    )}
                                  <span className="relative block text-[length:var(--ui-p-23)] compact:text-[16px] compact:leading-[1.4] leading-tight">
                                    {isMessageImage(item.text) ? (
                                      <img
                                        src={item.text}
                                        alt="Ảnh được gửi trong hội thoại"
                                        loading="lazy"
                                        className="block h-auto w-auto max-h-[260px] max-w-full border-0 p-0 m-0 object-contain"
                                      />
                                    ) : parseRoomShare(item.text) ? (
                                      <RoomShareCard
                                        share={parseRoomShare(item.text)!}
                                      />
                                    ) : (
                                      <NumberText text={item.text} />
                                    )}
                                  </span>
                                  {item.outgoing &&
                                    !parseRoomShare(item.text) &&
                                    !isMessageImage(item.text) && (
                                      <svg
                                        aria-hidden="true"
                                        viewBox="0 0 36 24"
                                        className="pointer-events-none absolute -right-2 -bottom-1 h-[var(--ui-p-20)] w-[var(--ui-p-28)]"
                                        fill="none"
                                        strokeLinecap="round"
                                      >
                                        <path
                                          d="M3 19C14 25 25 14 16 13C8 12 11 21 21 18C32 14 21 9 26 4C31-1 39 9 29 11"
                                          stroke="#b8873e"
                                          strokeWidth="5"
                                        />
                                        <path
                                          d="M3 19C14 25 25 14 16 13C8 12 11 21 21 18C32 14 21 9 26 4C31-1 39 9 29 11"
                                          stroke="#ffe5a6"
                                          strokeWidth="2"
                                        />
                                      </svg>
                                    )}
                                </button>
                                <p
                                  id={`message-time-${item.id}`}
                                  hidden={selectedMessage !== item.id}
                                  className={`mt-1 text-[length:var(--ui-p-20)] text-[#fff6df] [text-shadow:0_1px_3px_#160904] ${item.outgoing ? "text-right" : "text-left"}`}
                                >
                                  <time
                                    dateTime={new Date(
                                      item.sentAt,
                                    ).toISOString()}
                                  >
                                    {formatSentTime(item.sentAt)}
                                  </time>
                                </p>
                              </div>
                            </div>
                            {item.blocked && (
                              <p
                                role="status"
                                className="mt-1 w-full text-center text-[length:var(--ui-p-20)] text-[#ffe5a6] [text-shadow:0_1px_3px_#160904]"
                              >
                                Vui lòng bỏ chặn để gửi.
                              </p>
                            )}
                            {blockedAt !== undefined &&
                              !item.outgoing &&
                              item.sentAt > blockedAt && (
                                <div
                                  role="status"
                                  className="mt-1 flex w-full items-center justify-center gap-2 text-center text-[length:var(--ui-p-20)] text-[#ffe5a6] [text-shadow:0_1px_3px_#160904]"
                                >
                                  <span>Bạn đã chặn người chơi này.</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setBlockedAtByName((current) => {
                                        const next = { ...current };
                                        delete next[activeConversation.name];
                                        return next;
                                      })
                                    }
                                    className={`${buttonInteraction} border-0 bg-transparent p-0 font-bold text-[#ffe08b] underline underline-offset-2`}
                                  >
                                    Bỏ chặn
                                  </button>
                                </div>
                              )}
                          </div>
                        ),
                      )}
                    </div>
                    <form
                      data-message-composer
                      onSubmit={handleSendMessage}
                      style={
                        layout.compact && optionsOpen
                          ? { display: "none" }
                          : undefined
                      }
                      className="relative flex compact:h-[54px] compact:gap-[6px] compact:px-[6px] h-[var(--ui-p-76,76px)] [--composer-control-size:var(--ui-p-56)] compact:[--composer-control-size:36px] shrink-0 items-center gap-2 border-t border-[#d39a42] bg-[#2d160a] px-3"
                    >
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          event.currentTarget.value = "";
                          if (!file) return;
                          if (!account) {
                            setDatabaseError("Cần đăng nhập để gửi ảnh.");
                            return;
                          }
                          setMessageActionPending(true);
                          void prepareMessageImage(file)
                            .then((image) => {
                              setPendingImage(image);
                              setDatabaseError("");
                            })
                            .catch((error) =>
                              setDatabaseError(errorMessage(error)),
                            )
                            .finally(() => setMessageActionPending(false));
                        }}
                      />
                      {pendingImage && (
                        <div className="absolute bottom-full left-3 z-40 rounded border border-[#d39a42] bg-[#241007] p-2">
                          <img
                            src={pendingImage}
                            alt="Ảnh chuẩn bị gửi"
                            className="block max-h-[140px] max-w-[200px] object-contain"
                          />
                          <button
                            type="button"
                            aria-label="Bỏ ảnh đính kèm"
                            disabled={messageActionPending}
                            onClick={() => setPendingImage(null)}
                            className="absolute right-0 top-0 rounded bg-[#241007] px-2 text-white"
                          >
                            ×
                          </button>
                        </div>
                      )}
                      {emojiOpen && (
                        <div
                          ref={emojiPickerRef}
                          role="group"
                          aria-label="Chọn emoji"
                          className="absolute bottom-full right-3 z-50 grid grid-cols-6 gap-1 compact:gap-[4px] compact:p-[8px] rounded-lg border border-[#d39a42] bg-[#241007] p-2"
                        >
                          {[
                            "😀",
                            "😁",
                            "😂",
                            "🤣",
                            "😊",
                            "😍",
                            "🥰",
                            "😎",
                            "🤔",
                            "😅",
                            "😢",
                            "😭",
                            "😡",
                            "😮",
                            "😴",
                            "👍",
                            "👎",
                            "👏",
                            "🙏",
                            "💪",
                            "❤️",
                            "🔥",
                            "🎉",
                            "🏆",
                          ].map((emoji) => (
                            <button
                              data-ui-tab-sound
                              type="button"
                              key={emoji}
                              aria-label={`Chèn ${emoji}`}
                              className="grid size-9 compact:size-[32px] shrink-0 place-items-center rounded text-2xl compact:text-[24px] leading-none hover:bg-[#75471c]"
                              onClick={() => {
                                const start =
                                    draftInputRef.current?.selectionStart ??
                                    draft.length,
                                  end =
                                    draftInputRef.current?.selectionEnd ??
                                    draft.length;
                                const next =
                                  draft.slice(0, start) +
                                  emoji +
                                  draft.slice(end);
                                if (next.length <= 300) setDraft(next);
                                requestAnimationFrame(() => {
                                  if (!layout.compact)
                                    draftInputRef.current?.focus();
                                  draftInputRef.current?.setSelectionRange(
                                    start + emoji.length,
                                    start + emoji.length,
                                  );
                                });
                              }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        data-ui-selection-sound
                        aria-label="Đính kèm ảnh"
                        disabled={messageActionPending}
                        onClick={() => imageInputRef.current?.click()}
                        className={`${buttonInteraction} grid size-[var(--composer-control-size)] shrink-0 place-items-center rounded-lg border-2 border-[#e7b755] bg-[#3e200e] p-0 text-[#e7b755]`}
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="size-[70%]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="2" />
                          <circle cx="8" cy="8" r="2" />
                          <path d="m3 19 6-7 4 4 3-5 5 8" />
                        </svg>
                      </button>
                      <input
                        ref={draftInputRef}
                        aria-label="Nhập tin nhắn"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        maxLength={300}
                        placeholder="Nhập tin nhắn..."
                        className={`h-[var(--composer-control-size)] px-[10px] ${messagesFriendsField} ${messagesFriendsInput}`}
                      />
                      <button
                        ref={emojiTriggerRef}
                        data-ui-selection-sound
                        type="button"
                        aria-label="Biểu tượng cảm xúc"
                        aria-expanded={emojiOpen}
                        onClick={() => {
                          if (layout.compact) draftInputRef.current?.blur();
                          setEmojiOpen(true);
                        }}
                        className={`${buttonInteraction} grid size-[var(--composer-control-size)] compact:size-[30px] shrink-0 place-items-center border-0 bg-transparent p-0 leading-none text-[#e7b755]`}
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="block size-full"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M8 14c1.5 3 6.5 3 8 0" />
                          <circle
                            cx="8.5"
                            cy="9"
                            r="1"
                            fill="currentColor"
                            stroke="none"
                          />
                          <circle
                            cx="15.5"
                            cy="9"
                            r="1"
                            fill="currentColor"
                            stroke="none"
                          />
                        </svg>
                      </button>
                      <button
                        data-ui-selection-sound
                        type="submit"
                        onPointerDown={(event) => {
                          if (
                            layout.compact &&
                            document.activeElement === draftInputRef.current
                          )
                            event.preventDefault();
                        }}
                        disabled={
                          messageActionPending ||
                          (!draft.trim() && !pendingImage)
                        }
                        aria-label="Gửi tin nhắn"
                        className={`${buttonInteraction} m-0 h-fit w-fit shrink-0 border-0 bg-transparent p-0 leading-none`}
                      >
                        <CrispUiImage
                          src={send}
                          alt=""
                          className="block size-[var(--ui-p-50)] compact:size-[36px] object-contain"
                        />
                      </button>
                    </form>
                  </>
                )}
              </MessagesChatPane>
              {optionsPanel &&
                (layout.compact
                  ? optionsPanel
                  : createPortal(optionsPanel, dialogRef.current!))}
              {sentNotice.notice}
              {friendship.removalName && (
                <MessagesFriendRemovalConfirmation
                  name={friendship.removalName}
                  skip={friendship.skipConfirmation}
                  onSkipChange={friendship.setSkipConfirmation}
                  onCancel={cancelFriendRemoval}
                  onConfirm={confirmFriendRemoval}
                />
              )}
            </div>
          </MessagesDialogSurface>
          {optionsOpen && !layout.compact && (
            <div
              aria-hidden="true"
              className="fixed inset-0 z-[35] bg-black/45"
            />
          )}
        </div>
      )}
      {createGroupOpen && (
        <MessagesCreateGroupPanel
          compact={layout.compact}
          width={
            layout.compact
              ? expandedWidth
              : Math.min(
                  expandedWidth * 0.9,
                  (panelHeight(sourceHeight) * 0.94 * 944) / 997,
                )
          }
          height={
            layout.compact
              ? panelHeight(sourceHeight)
              : Math.min(
                  window.innerHeight - 32,
                  panelHeight(sourceHeight) * 1.08,
                )
          }
          selfName={currentUserName || "Bạn"}
          onBack={dismissCreateGroup}
          onCreate={handleCreateGroup}
          onViewInfo={onViewInfo}
        />
      )}
      {previewImage && (
        <MessageImagePreview
          src={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </dialog>
  );
}
