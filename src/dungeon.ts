import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Voice } from "@type/dungeon";

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
   * Get all voice messages from the Dungeon.
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
   * Fetches a voice by ID from the Dungeon.
   * @param id Telegram Message ID of a voice message
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
   * Creates a new voice.
   * @param file File ID of the voice
   * @param chat The Chat ID of sender
   * @returns Promise<Voice[]>
   */
  async set(file: string, chat: number): Promise<Voice[]> {
    const { data: Voices, error } = await this.client
      .from("Voices")
      .insert([{ file, chat }]);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Voices;
  }

  /**
   * Deletes voice.
   * @param id The ID of the voice
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
   * Get all voice messages from the Dungeon.
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
}
