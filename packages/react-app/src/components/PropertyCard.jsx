import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { DEFAULT_HOME_ICON } from "../constants";

const { Meta } = Card;

const PropertyCard = ({
  title,
  description,
  imgUrl = DEFAULT_HOME_ICON,
  icon = "https://joeschmoe.io/api/v1/random",
}) => {
  return (
    <Card
      style={{ width: 200, cursor: "pointer", margin: 20 }}
      cover={<img alt="example" src={imgUrl} style={{ width: 200, height: 200, margin: "0 auto" }} />}
      actions={
        [
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
        ]
      }
    >
      <Meta avatar={<Avatar src={icon} />} title={title} description={description} />
    </Card>
  );
};

export default PropertyCard;
