import MedTableAllCopy from "../../Components/MedTableAll copy";
import Sidebar from "../../MainPatient/SidebarHome";

function ViewMedPatient() {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <MedTableAllCopy />
    </div>
  );
}

export default ViewMedPatient;