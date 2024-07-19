import { getAvatarUrl } from "../../api";
import parse from "html-react-parser";
import { format } from "date-fns";
import {
  ChildNavigator,
  MessageCardWrapper,
  MessageText,
  MessageTitle,
} from "./MessageCard.styled";

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
    user: { avatar },
    childListExpanded,
    childListLoaded,
    childList,
  } = data;
  const avatarSrc = getAvatarUrl(avatar ? avatar : "avatar9.svg");
  const answerCount = answers_count?.amount || 0;

  const expandChildren = () => {
    if (childListExpanded) return;
    if (childListLoaded) {
      setChildExpand(id, true);
    } else {
      getChildPosts(id);
    }
  };
  const CollapseChildren = () => {
    if (!childListExpanded) return;
    setChildExpand(id, false);
  };

  return (
    <MessageCardWrapper level={level}>
      <MessageTitle>
        <img src={avatarSrc} alt="avatar" width={40} height={43} />
        <div>{username}</div>
        <div>{email}</div>
        <div>{format(new Date(createdAt), "dd.MM.yyyy' в 'HH:mm")}</div>
        <ChildNavigator>
          <button type="button" onClick={expandChildren}>
            ↓
          </button>
          <span>{answerCount}</span>
          <button type="button" onClick={CollapseChildren}>
            ↑
          </button>
        </ChildNavigator>
      </MessageTitle>
      <MessageText>{parse(messageText)}</MessageText>
      {childListExpanded &&
        childListLoaded &&
        childList.map((elem) => (
          <MessageCard
            key={elem.id}
            data={elem}
            level={level + 1}
            getChildPosts={getChildPosts}
          />
        ))}
    </MessageCardWrapper>
  );
};
// ˅˄˅↑↓
