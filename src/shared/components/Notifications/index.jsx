import React from "react";
import Notifications from "react-notifications-menu";
import { Image, Message, NotificationContainer, NotificationWrapper } from "./Styles";
import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import api from "../../utils/api";
import { getStoredAuthToken } from "../../utils/authToken";

const NotificationHandler = ({ socket, userId }) => {

  const match = useRouteMatch();

    const data = socket.notifications.map(notififcation => {
      if (notififcation.type === "added_comment"){
        return {
          id: notififcation.id,
          userId,
          issueId: notififcation.issue.id,
          image: '/Assets/comment.png',
          message: notififcation.message,
        }
      }
    })

  const ReadAllNotifications = async () => {
    const response = await api.get(
      `/notification/read_all/${userId}`,
    )
  }

  return (
    <NotificationWrapper>
    <Notifications
      data={data}
      notificationCard={NotificationCard}
      header={{
        title: "Notifications",
        option: { text: "Mark all as read", onClick: ReadAllNotifications}
      }}

    />
  </NotificationWrapper>
)};


const NotificationCard = ({ data }) => {

  const match = useRouteMatch();


  const NotificationClick = async () => {
    const response = await api.get(
      `/notification/read/${data.id}`,
    )
  }


  return (
    <Link key={data.issueId} to={`${match.path}/issues/${data.issueId}`}>
      <NotificationContainer onClick={NotificationClick}>
        <Image>
          <img src={data.image}/>
        </Image>
        <Message>
          {data.message}
        </Message>
      </NotificationContainer>
    </Link>

  )};

const mapStateToProps = state => ({
  socket: state.socketState,
  userId: state.userState.user.id
});

export default connect(mapStateToProps)(NotificationHandler);