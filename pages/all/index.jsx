import PageTitle from "../../components/PageTitle/PageTitle.jsx";
import TableHeader from "../../components/TableHeader/TableHeader.jsx";
import DayTitleAndPoints from "../../components/DayTitleAndPoints/DayTitleAndPoints.jsx";

const Allpage = (props) => {
  return (
    <div>
      <PageTitle />
      <div className={"main_container"}>
        <Date date={"2022/12/01"} />
        <TableHeader />
        <DayTitleAndPoints
          dayTitle="faucibus ornare suspendisse sed nisi lacus sed"
          dayPoints="100"
        />
      </div>
    </div>
  );
};

export default Allpage;
