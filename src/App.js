import React, { useState } from "react";
import { bangladeshDivisions as divisions } from "./dataset";
import "./App.scss";

function BangladeshSelector() {
    const [division, setDivision] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [upazilas, setUpazilas] = useState([]);
    const [selectedUpazila, setSelectedUpazila] = useState("");
    const [unions, setUnions] = useState([]);
    const [selectedUnion, setSelectedUnion] = useState("");
    const [village, setVillage] = useState("");

    // // useEffect(() => {
    // //     fetch("https://example.com/api/bangladesh")
    // //         .then((response) => response.json())
    // //         .then((data) => setDivisions(data))
    // //         .catch((error) => console.error(error));
    // // }, []);

    const handleDivisionChange = (event) => {
        const dname = event.target.value;
        setDivision(dname);
        const zone = divisions.find((d) => d.name === dname);
        if (!zone) {
            return;
        }
        setDistricts(zone.districts);
        setSelectedDistrict("");
        setSelectedUpazila("");
        setSelectedUnion("");
        setUpazilas([]);
        setUnions([]);
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        const zone = districts.find((d) => d.name === event.target.value);
        if (!zone) {
            return;
        }
        setSelectedUpazila("");
        setSelectedUnion("");
        setUpazilas(zone.upazilas);
        setUnions([]);
    };

    const handleUpazilaChange = (event) => {
        setSelectedUpazila(event.target.value);
        const zone = upazilas.find((d) => d.name === event.target.value);
        if (!zone) {
            return;
        }
        setUnions(zone.unions);
        setSelectedUnion("");
        setVillage("");
    };

    const handleUnionChange = (event) => {
        setSelectedUnion(event.target.value);
        setVillage("");
    };

    const handleVillage = (event) => {
        setVillage(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            ` Division: ${division} \n District: ${selectedDistrict} \n Upazila: ${selectedUpazila} \n Union: ${selectedUnion} \n Village:${village}`
        );
        setDivision("");
        setDistricts([]);
        setSelectedDistrict("");
        setUpazilas([]);
        setSelectedUpazila("");
        setUnions([]);
        setSelectedUnion("");
    };

    return (
        <div className="home">
            <h2>Country Selector</h2>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    {/* Division */}
                    <div className="select__box">
                        <label className="box__title">Division:</label>
                        <select name="division" onChange={handleDivisionChange}>
                            <option value="none">-- Select Division --</option>
                            {divisions &&
                                divisions.map((d) => (
                                    <option key={d.name} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* District */}
                    {division && (
                        <div className="select__box">
                            <label className="box__title">District</label>
                            <select
                                name="district"
                                onChange={handleDistrictChange}
                            >
                                <option value="none">
                                    -- Select District --
                                </option>
                                {districts.map((d) => (
                                    <option key={d.name} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {/* Upazila */}
                    {selectedDistrict && (
                        <div className="select__box">
                            <label className="box__title">Upazila</label>{" "}
                            <select
                                name="upazila"
                                onChange={handleUpazilaChange}
                            >
                                <option value="none">
                                    -- Select upazila --
                                </option>
                                {upazilas.map((u) => (
                                    <option key={u.name} value={u.name}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Union */}
                    {selectedUpazila && (
                        <div className="select__box">
                            <label className="box__title">Union</label>{" "}
                            <select name="union" onChange={handleUnionChange}>
                                <option value="none">-- Select Union --</option>
                                {unions.map((u) => (
                                    <option key={u.name} value={u.name}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* village */}
                    {selectedUnion && (
                        <>
                            <label className="input__title">Village</label>
                            <input
                                type="text"
                                name="village"
                                placeholder="Village"
                                onChange={handleVillage}
                                value={village}
                            />
                        </>
                    )}
                    {selectedUnion && <button type="submit">Submit</button>}
                </form>
            </div>
        </div>
    );
}

export default BangladeshSelector;
