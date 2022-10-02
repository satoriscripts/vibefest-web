import { Container, Table } from "@mantine/core";

export default function DonatePage() {
  const causes = [
    // {
    //   cause: "The Trevor Project",
    //   description:
    //     "The Trevor Project is the world’s largest suicide prevention and crisis intervention organization for LGBTQ young people.",
    //   trace: "Your Money ➡️ The Trevor Project",
    //   link: "https://donate.tiltify.com/+vibefestvol-2/vibefest2",
    // },
    {
      cause: "The VIBEFEST fundraiser for LAKE",
      description:
        'LAKE is one of the festival\'s founders, and had an insane set at VIBEFEST Volume 1. However, due to computer issues, they were unable to finish their new set they were planning to debut at Volume 2. So we are going to raise money to get them a new computer! If you like "Break Free" in Volume 1 and wanna help LAKE, anything would help! And you get some merch!!',
      trace: "Your Money ➡️ Teespring ➡️ Our PayPal ➡️ LAKE!",
      link: "https://vibefest.creator-spring.com/",
    },
    // {
    //   cause: "The Robinson Malawi Fund",
    //   description:
    //     "The Robinson Malawi fund is a charity organization focused on raising money to improve outcomes for pediatric Burkitt's Lymphoma patients in Malawi through direct patient care.",
    //   trace:
    //     "Your Money ➡️ Teespring ➡️ Our PayPal ➡️ The Robinson Malawi Fund",
    //   link: "https://vibefest.creator-spring.com/",
    // },
    // {
    //   cause: "The Colon Cancer Foundation",
    //   description: (
    //     <a href="https://coloncancercoalition.org/about/">About Page</a>
    //   ),
    //   trace:
    //     "Your Money ➡️ Teespring ➡️ Our PayPal ➡️ The Colon Cancer Foundation",
    //   link: "https://vibefest.creator-spring.com/",
    // },
  ];
  const rows = causes.map((cause) => (
    <tr key={cause.cause}>
      <td>{cause.cause}</td>
      <td>{cause.description}</td>
      <td>{cause.trace}</td>
      <td>
        <a href={cause.link}>{cause.link}</a>
      </td>
    </tr>
  ));

  return (
    <Container>
      <h1>Help VIBEFEST raise money!</h1>
      <p>
        We are currently raising money to help one of our staff/artists get a
        new computer!
      </p>
      <p>
        Because we believe in transparency, we will give you a breakdown on what
        exactly the cause is for, and where your money goes when it leaves your
        pocket.
      </p>

      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Cause</th>
            <th>Description</th>
            <th>The money trace</th>
            <th>Donation link.</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
