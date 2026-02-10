import MiddenCard from "../components/MiddenCard";
import AppGrid from "../components/AppGrid";

const Experiments = () => {
  return (
    <MiddenCard>
      <AppGrid
        small
        items={[
          {
            label: "Back",
            symbol: "⬅️",
            to: "/",
          },
          {
            label: "Yesterday's Paper",
            symbol: "📰",
            to: "https://bsky.app/profile/todaylastcentury.bsky.social",
            description:
              "A Bluesky bot that, every day, posts a newspaper headline from exactly 100 years ago. This is an experiment with the NYT Articles API.",
          },
          {
            label: "Chutes Resolver",
            symbol: "🛝",
            to: "https://crymall.github.io/chutes-resolver/",
            description:
              "Chutes and Ladders is a game for children that robs them of any agency at all. There is no player choice, and the outcome is entirely left to chance. What a lesson to teach! It and its spawn (Candy Land, The Game of Life) are insipid and evil. If a friend ever asks you to play, save an hour, use this app, and figure out who would have won.",
          },
          {
            label: "Revolutionary Date",
            symbol: "📅",
            to: "https://crymall.github.io/revolutionary-date/",
            description: "Converts bourgeois Gregorian dates to a more structured, poetic, and woke system—the French Republican Calendar, the official datekeeping device of the French Revolution, since 1793."
          },
        ]}
      />
    </MiddenCard>
  );
};

export default Experiments;
