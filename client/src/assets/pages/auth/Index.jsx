import TitleIndex from "../../components/TitleIndex.jsx";
import '../../components/FormLogin.css';
import FrecuentQuestions from "../../components/FrecuentQuestions.jsx";
import '../../components/FrecuentQuestions.css';
import DataSolidata from "../../components/DataSolidata.jsx";
import '../../components/DataSolidata.css'
import LastNews from "../../components/LastNews.jsx";
import '../../components/LastNews.css'

function Login () {

  return (
    <>
        <TitleIndex />
        <FrecuentQuestions />
        <DataSolidata />
        <LastNews />
    </>
        
  )
}

export default Login