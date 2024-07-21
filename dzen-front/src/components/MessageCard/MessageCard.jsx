import { getAvatarUrl } from "../../api";
import parse from "html-react-parser";
import { format } from "date-fns";
import {
  ChildNavigator,
  MessageCardWrapper,
  MessageText,
  MessageTitle,
} from "./MessageCard.styled";
import { replaceScriptToCodeTags } from "../../utils/validate";
import { useCallback, useState } from "react";
import { PostMessageForm } from "../PostMessageForm/PostMessageForm";
import { CommentOutlined } from "@ant-design/icons";
import { AttachedFileButton } from "../AttachedFileButton";

export const MessageCard = ({
  data,
  getChildPosts,
  setChildExpand,
  level = 0,
}) => {
  const {
    id,
    user: { username, email },
    messageText,
    createdAt,
    answers_count,
    attachedFile,
    user: { avatar },
    childListExpanded,
    childListLoaded,
    childList,
  } = data;
  const avatarSrc = getAvatarUrl(avatar ? avatar : "avatar9.svg");
  const answerCount = answers_count?.amount || 0;
  const [reply, setReply] = useState(false);

  const expandChildren = () => {
    console.log("expand");
    if (childListExpanded) return;
    if (childListLoaded) {
      setChildExpand(id, true);
    } else {
      getChildPosts(id);
    }
  };
  const CollapseChildren = () => {
    console.log("colapse");
    if (!childListExpanded) return;
    setChildExpand(id, false);
  };

  const linkHandle = (e) => {
    console.dir(e.target);
    if (e.target.tagName.toLowerCase() == "a") {
      e.preventDefault();
      window.open(e.target.href, "_blank", "noopener,noreferrer");
    }
  };

  const handleReply = () => {
    setReply(true);
  };

  const handleClose = useCallback(() => {
    setReply(false);
  }, []);

  return (
    <MessageCardWrapper level={level} onClick={linkHandle}>
      <MessageTitle>
        <img src={avatarSrc} alt="avatar" width={40} height={43} />
        <div>{username}</div>
        <div>{email}</div>
        <div>{format(new Date(createdAt), "dd.MM.yyyy' 'HH:mm")}</div>
        {data.id}
        {`level:${level}`}
        <AttachedFileButton filename={attachedFile} />
        {!reply && (
          <button
            type="button"
            onClick={handleReply}
            className="reply-button"
            title="Reply"
          >
            <CommentOutlined style={{ fontSize: 24 }} />
          </button>
        )}
        <ChildNavigator>
          <button
            type="button"
            onClick={expandChildren}
            disabled={childListExpanded || !answerCount}
            title="Expand"
          >
            ↓
          </button>
          <span>{answerCount}</span>
          <button
            type="button"
            onClick={CollapseChildren}
            disabled={!childListExpanded}
            title="Collapse"
          >
            ↑
          </button>
        </ChildNavigator>
      </MessageTitle>
      <MessageText>{parse(replaceScriptToCodeTags(messageText))}</MessageText>
      {reply && (
        <PostMessageForm
          parentId={id}
          level={level + 1}
          handleClose={handleClose}
        />
      )}
      {childListExpanded &&
        childListLoaded &&
        childList.map((elem) => (
          <MessageCard
            key={elem.id}
            data={elem}
            level={level + 1}
            getChildPosts={getChildPosts}
            setChildExpand={setChildExpand}
          />
        ))}
    </MessageCardWrapper>
  );
};
// ˅˄˅↑↓
