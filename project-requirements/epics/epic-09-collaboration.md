# Epic 9: Collaboration & Sharing

## Description
Enable teams to collaborate on translations, share documents, and work together efficiently.

---

## User Stories

### US-9.1: Share Document Link
- **As a** user
- **I want to** share my translated document with others via link
- **So that** they can view or download it without creating an account
- **Acceptance Criteria:**
  - Generate unique, shareable link for any document
  - Set expiration date:
    - 1 day
    - 7 days
    - 30 days
    - Never (permanent link)
  - Password protection option
  - Set permissions:
    - View only
    - View and download
    - View, download, and comment
  - Track sharing analytics:
    - Number of views
    - Number of downloads
    - Viewer locations (optional)
    - Access timestamps
  - Revoke access anytime (link becomes invalid)
  - Email notification when link is accessed
  - Copy link button with confirmation

### US-9.2: Team Workspaces
- **As a** team manager
- **I want to** create shared workspaces for my team
- **So that** team members can collaborate on translations
- **Acceptance Criteria:**
  - Create multiple workspaces per organization
  - Invite members by email (up to 50 users per workspace)
  - Assign roles with specific permissions:
    - **Admin**: Full control (manage users, billing, all documents)
    - **Manager**: Manage documents, view team analytics
    - **Editor**: Upload, translate, edit documents
    - **Viewer**: View and download documents only
  - Shared document library visible to all workspace members
  - Shared glossaries and translation memory across workspace
  - Activity feed showing all team actions
  - Workspace-level settings (default languages, quality preferences)
  - Transfer document ownership between team members
  - Archive/unarchive workspaces

### US-9.3: Comments and Annotations
- **As a** team member
- **I want to** add comments and annotations to translated documents
- **So that** I can discuss improvements and provide feedback to colleagues
- **Acceptance Criteria:**
  - Highlight any text segment and add comment
  - Comment thread support (reply to existing comments)
  - Tag team members with @mention for notifications
  - Rich text comments (bold, italic, links)
  - Attach screenshots or files to comments (max 5MB)
  - Mark comments as resolved or open
  - Filter comments by:
    - Status (open, resolved)
    - Commenter
    - Date range
  - Pin important comments to top
  - Export comments as PDF summary
  - Email notifications for new comments and replies

### US-9.4: Real-time Collaboration
- **As a** team member
- **I want to** see when others are viewing or editing a document
- **So that** we can avoid conflicts and coordinate work
- **Acceptance Criteria:**
  - Show active viewers/editors with avatars
  - Display cursor positions of other editors in real-time
  - Highlight sections being edited by others
  - Lock mechanism to prevent simultaneous edits to same segment
  - "User X is typing..." indicator
  - Automatic merge of non-conflicting changes
  - Conflict resolution interface for simultaneous edits
  - Activity indicator (green dot) for online users

### US-9.5: Document Version Control
- **As a** user
- **I want to** manage document versions
- **So that** I can track changes and revert if needed
- **Acceptance Criteria:**
  - Automatic version save on significant edits
  - Manual version creation with descriptive labels
  - Version history list showing:
    - Version number
    - Creation date and time
    - Author name
    - Description/notes
    - File size
  - Compare any two versions side-by-side
  - Restore previous version as current
  - Download any historical version
  - Version retention: unlimited for paid plans, last 5 for free
  - Branch from version to create alternative translation

---

## Team Management Features

### Workspace Administration
- Dashboard showing:
  - Active members
  - Storage usage
  - Monthly translation quota usage
  - Pending invitations
- Bulk user import via CSV
- Single Sign-On (SSO) integration for enterprise
- Custom workspace branding (logo, colors)
- Workspace-level billing and invoicing

### Permission Matrix

| Feature              | Viewer | Editor | Manager | Admin |
| -------------------- | ------ | ------ | ------- | ----- |
| View documents       | ✓      | ✓      | ✓       | ✓     |
| Download documents   | ✓      | ✓      | ✓       | ✓     |
| Upload documents     | ✗      | ✓      | ✓       | ✓     |
| Edit translations    | ✗      | ✓      | ✓       | ✓     |
| Delete own documents | ✗      | ✓      | ✓       | ✓     |
| Delete any document  | ✗      | ✗      | ✓       | ✓     |
| Manage glossaries    | ✗      | ✓      | ✓       | ✓     |
| View team analytics  | ✗      | ✗      | ✓       | ✓     |
| Invite/remove users  | ✗      | ✗      | ✗       | ✓     |
| Manage billing       | ✗      | ✗      | ✗       | ✓     |
| Workspace settings   | ✗      | ✗      | ✗       | ✓     |

---

## Technical Implementation

### Sharing Links
```sql
CREATE TABLE shared_links (
    id UUID PRIMARY KEY,
    document_id UUID REFERENCES documents(id),
    user_id UUID REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    permission_level VARCHAR(50), -- view, download, comment
    expires_at TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP
);
```

### Team Workspaces
```sql
CREATE TABLE workspaces (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    owner_id UUID REFERENCES users(id),
    storage_quota_mb INTEGER,
    pages_quota INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE workspace_members (
    id UUID PRIMARY KEY,
    workspace_id UUID REFERENCES workspaces(id),
    user_id UUID REFERENCES users(id),
    role VARCHAR(50), -- admin, manager, editor, viewer
    invited_by UUID REFERENCES users(id),
    joined_at TIMESTAMP,
    UNIQUE(workspace_id, user_id)
);
```

### Comments System
```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY,
    document_id UUID REFERENCES documents(id),
    user_id UUID REFERENCES users(id),
    parent_comment_id UUID REFERENCES comments(id),
    segment_id VARCHAR(255), -- identifies text segment
    content TEXT,
    status VARCHAR(50), -- open, resolved
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE comment_mentions (
    id UUID PRIMARY KEY,
    comment_id UUID REFERENCES comments(id),
    mentioned_user_id UUID REFERENCES users(id),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP
);
```

### Real-time Collaboration
- **Technology**: WebSockets (Socket.io or native WebSocket)
- **Backend**: Redis Pub/Sub for message broadcasting
- **Conflict Resolution**: Operational Transformation (OT) or CRDT
- **Presence**: Track active users per document in Redis

### Version Control
- Store complete document snapshot for each version
- Use diff algorithm to minimize storage (store deltas)
- Compress old versions
- Version numbering: Major.Minor (1.0, 1.1, 2.0)

---

## Notification System

### Notification Types
- New comment on your document
- Reply to your comment
- @mention in comment
- Document shared with you
- User joined your workspace
- Translation completed (for large documents)
- Storage quota warning
- Subscription expiring soon

### Notification Channels
- In-app notifications (bell icon with badge)
- Email notifications (configurable frequency)
- Browser push notifications
- Slack/Teams integration (enterprise feature)

### Notification Preferences
- Configure per notification type
- Batch notifications (immediate, hourly, daily digest)
- Quiet hours (no notifications during specified times)
- Mute specific documents or workspaces
