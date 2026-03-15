import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';
import { AIChatSession } from '../../../../services/AIModel';


const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'
function RichTextEditor({ value, onChange, index }) {
  const [loading, setLoading] = useState(false);
  const { resumeInfo } = useContext(ResumeInfoContext);

  const GenerateSummeryFromAI = async () => {
    const title = resumeInfo?.experience?.[index]?.title;

    if (!title) {
      toast("Please Add Position Title");
      return;
    }

    try {
      setLoading(true);

      const prompt = PROMPT.replace("{positionTitle}", title);

      const result = await AIChatSession(prompt);

      onChange(result);

    } catch (error) {
      console.log(error);
      toast("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>

        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}
export default RichTextEditor