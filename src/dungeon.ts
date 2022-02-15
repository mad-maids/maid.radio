import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Voice, OnlyId } from "@type/dungeon";

export default class Dungeon {
  /**
   * Main client sdk.
   * @protected
   * @type SupabaseClient
   */
  protected client?: SupabaseClient;

  constructor(URL: string, KEY: string) {
    this.client = createClient(URL, KEY);
  }

  /**
   * Get all event messages from the Dungeon.
   * @returns Promise<Voice[]>
   */
  async all(): Promise<Voice[]> {
    const { data: Voices, error } = await this.client
      .from("Voices")
      .select("*")
      .order("id")
      .range(0, 100);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Voices;
  }

  /**
   * Fetches a event by ID from the Dungeon.
   * @param id Telegram Message ID of a event message
   * @returns Promise<Voice>
   */
  async get(id: number): Promise<Voice> {
    const { data: Voices, error } = await this.client
      .from("Voices")
      .select("*")
      .eq("id", id);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Voices[0];
  }

  /**
   * Creates a new event.
   * @param file File ID of the event
   * @param chat The Chat ID of sender
   * @param type Type of content
   * @returns Promise<Voice[]>
   */
  async set(
    file: string,
    chat: number,
    type: "voice" | "audio"
  ): Promise<Voice[]> {
    const { data: Voices, error } = await this.client
      .from("Voices")
      .insert([{ file, chat, type }]);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Voices;
  }

  /**
   * Deletes event.
   * @param id The ID of the event
   * @returns Promise<Voice[]>
   */
  async del(id: number): Promise<Voice[]> {
    const { data: Voices, error } = await this.client
      .from("Voices")
      .delete()
      .match({ id: id });

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Voices;
  }

  /**
   * Get all event messages from the Dungeon.
   * @returns Promise<Voice[]>
   */
  async pending(): Promise<Voice> {
    const { data: Voices, error } = await this.client
      .from("Voices")
      .select("*")
      .order("id")
      .range(0, 1);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Voices[0];
  }

  /**
   * Get the counts of messages sent to the channel
   * @param action increment or decrement whether the counter.
   * @returns Promise<number>
   */
  async count(action: "up" | "down"): Promise<number> {
    const { data: Counts, error } = await this.client
      .from("Counter")
      .select("*")
      .eq("type", "voices");

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    switch (action) {
      case "up":
        await this.client
          .from("Counter")
          .update({ count: Counts[0].count + 1 })
          .match({ type: "voices" });
        if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
        break;
      case "down":
        await this.client
          .from("Counter")
          .update({ count: Counts[0].count - 1 })
          .match({ type: "voices" });
        if (error) throw new Error(`${error.message} (hint: ${error.hint})`);
        break;
      default:
        throw new Error("Action not specified!");
    }

    return Counts[0].count;
  }

  /**
   * Get all admin telegram IDs from the Dungeon.
   * @returns Promise<OnlyId[]>
   */
  async getAllAdmins(): Promise<OnlyId[]> {
    const { data: Groups, error } = await this.client
      .from("Admins")
      .select("id")
      .order("id")
      .range(0, 100);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }
}
