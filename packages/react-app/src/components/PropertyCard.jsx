import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";

const { Meta } = Card;

const PropertyCard = ({
  title,
  description,
  imgUrl = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  icon = "https://joeschmoe.io/api/v1/random",
}) => {
  return (
    <Card
      style={{ width: 300, cursor: "pointer" }}
      cover={<img alt="example" src={imgUrl} />}
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
