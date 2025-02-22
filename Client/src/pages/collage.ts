export interface College {
    id: string;
    name: string;
    description: string;
    location: string;
    founded: string;
    courses: string[];
    rating: number;
  }
  
  export const colleges: College[] = [
    {
      id: "1",
      name: "Dharmsinh Desai University",
      description: "A premier university known for excellence in engineering and technology education.",
      location: "Nadiad, Gujarat",
      founded: "1968",
      courses: ["Computer Engineering", "Information Technology", "Mechanical Engineering", "Civil Engineering"],
      rating: 4.5
    },
    {
      id: "2",
      name: "Nirma University",
      description: "Leading private university offering comprehensive education in multiple disciplines.",
      location: "Ahmedabad, Gujarat",
      founded: "1994",
      courses: ["Technology", "Management", "Pharmacy", "Law"],
      rating: 4.3
    },
    {
      id: "3",
      name: "DAIICT",
      description: "Renowned for its cutting-edge research and innovation in ICT.",
      location: "Gandhinagar, Gujarat",
      founded: "2001",
      courses: ["ICT", "Data Science", "IoT", "AI & ML"],
      rating: 4.7
    },
    {
      id: "4",
      name: "LD University",
      description: "Historic institution known for its diverse academic programs.",
      location: "Ahmedabad, Gujarat",
      founded: "1965",
      courses: ["Engineering", "Pharmacy", "Architecture", "Management"],
      rating: 4.2
    },
    {
      id: "5",
      name: "IIT Bombay",
      description: "One of India's premier institutions for technical education and research.",
      location: "Mumbai, Maharashtra",
      founded: "1958",
      courses: ["Engineering", "Design", "Management", "Pure Sciences"],
      rating: 4.9
    }
  ];