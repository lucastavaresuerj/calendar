import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

class CalendarCard extends React.Component {
  render() {
    const { calendar } = this.props;
    return (
      <Card>
        <Image src="/images/icon_calendar.svg" wrapped ui={true} />
        <Card.Content>
          <Card.Header>
            <Link to={`/calendars/${calendar.id}`}>{calendar.title}</Link>
          </Card.Header>
          <Card.Meta>
            Lucas Tavares
            <span className="date">
              {` in ${new Date(calendar.date).toLocaleDateString()}`}
            </span>
          </Card.Meta>
          <Card.Description>{calendar.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span className="right floated">
            <Icon name="eye" /> {calendar.views}
          </span>
          <Icon name="comment" /> {calendar.comments.length}
        </Card.Content>
      </Card>
    );
  }
}

export default CalendarCard;
