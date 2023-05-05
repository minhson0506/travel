import {useMainContext} from "../contexts/MainContext";

interface Props {}

const About: React.FC<Props> = () => {
    const {profile} = useMainContext();

    return (
        <div style={{ width: '60%', height: '100vh', margin: '20px', padding: '20px' }}>
            <div style={{borderRadius: '20px', padding: '20px', border: "5px solid white"}}>
                <h1>About me</h1>
                <h2>{profile?.about}</h2>
            </div>
            <div style={{borderRadius: '20px', padding: '20px', border: "5px solid white"}}>
                <h1>Location</h1>
                <h2>{profile?.location}</h2>
            </div>
            <div style={{borderRadius: '20px', padding: '20px', border: "5px solid white"}}>
                <h1>Interests</h1>
                {profile?.interests.map((interest) => {
                    return <h2>{interest}</h2>
                })}
            </div>
        </div>
    );
};

export default About;
