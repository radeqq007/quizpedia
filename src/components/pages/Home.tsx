import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Home = () => {
  return (
    <div className="flex flex-col gap-18 items-center w-1/3 m-auto h-screen p-8">
      <h1 className="text-6xl font-black">Quizpedia</h1>

      <form className="w-full flex items-end gap-5">
        <Field>
          <span className="flex flex-col gap-2">
            <FieldLabel className="text-xl" htmlFor="input">
              I want a quiz about...
            </FieldLabel>
            <Input id="input" placeholder="Ducks..." />
          </span>
        </Field>
        <Button>Search...</Button>
      </form>

      <div className="border border-input bg-transparent rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-3">
        <Label className="text-2xl font-bold">Summary</Label>
        <p className="text-primary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
          reprehenderit ratione ipsum neque, nulla consequatur tempora ab fugit
          corrupti magnam facere rerum eum, cum expedita dolorum ducimus, atque
          velit doloribus.
        </p>

        <span className="w-full flex gap-2 justify-end mt-5">
          <Button variant="secondary">Expand</Button>
          <Button>Start</Button>
        </span>
      </div>
    </div>
  );
};
