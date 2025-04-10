"use client"

import React, { useState, useCallback } from 'react';
import { suggestFields } from '@/ai/flows/suggest-fields';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface FormField {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'number' | 'email' | 'radio' | 'checkbox' | 'dropdown' | 'textarea';
  options?: { label: string; value: string; }[]; // Only for 'dropdown' type
}

const initialFields: FormField[] = [
    { id: '1', label: 'Full Name', name: 'fullName', type: 'text' },
    { id: '2', label: 'Email', name: 'email', type: 'email' },
    { id: '3', label: 'Message', name: 'message', type: 'textarea' }
  ];

const Home: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const { toast } = useToast()

  const handleSuggestFields = async () => {
    if (formTitle || formDescription) {
      try {
        const suggested = await suggestFields({ title: formTitle, description: formDescription });
        console.log("suggested fields:", suggested);
        // You might want to update the fields state with the suggested fields.
        // This is a placeholder; you'll need to adapt it to your specific needs.
        // For example, you might add the suggested fields to the end of the current fields array.
        // setFields(prevFields => [...prevFields, ...suggested.suggestedFields.map(field => ({ label: field, name: field.toLowerCase().replace(/\s/g, ''), type: 'text', id: Date.now().toString() }))]);
      } catch (error) {
          toast({
              title: "Failed to suggest fields",
              description: "There was an error suggesting fields. Please try again.",
              variant: "destructive",
          })
      }
    } else {
          toast({
              title: "Please enter form title or description",
              description: "Please enter a form title or description to get suggestions.",
          })
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would handle the form submission, e.g., sending data to an API.
    console.log("Form submitted!");
  };

    const onDragEnd = useCallback((result: any) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.index === destination.index) {
            return;
        }

        const newFields = [...fields];
        const [removed] = newFields.splice(source.index, 1);
        newFields.splice(destination.index, 0, removed);

        setFields(newFields);
    }, [fields]);


  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Form Builder</CardTitle>
          <CardDescription>Build your forms with ease.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
            
              <Label htmlFor="formTitle">Form Title</Label>
              <Input type="text" id="formTitle" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="mt-1" />
            
            
              <Label htmlFor="formDescription">Form Description</Label>
              <Textarea id="formDescription" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} className="mt-1" />
            
          
          <Button onClick={handleSuggestFields} className="w-full md:w-auto">
            Suggest Fields
          </Button>
        </CardContent>
      </Card>
    

    
      <Card>
        <CardHeader>
          <CardTitle>Generated Form</CardTitle>
          <CardDescription>Drag and drop to reorder the fields.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleFormSubmit}
            className="grid gap-4"
          >
            {fields.map((field) => (
              <div key={field.id}>
                
                  
                    <Label htmlFor={field.name}>
                      {field.label}
                    </Label>
                  
                  {field.type === 'text' && (
                    <Input type="text" id={field.name} placeholder={field.label} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  )}
                  {field.type === 'email' && (
                      <Input type="email" id={field.name} placeholder={field.label} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  )}
                  {field.type === 'number' && (
                    <Input type="number" id={field.name} placeholder={field.label} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  )}
                  {field.type === 'textarea' && (
                    <Textarea id={field.name} placeholder={field.label} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  )}
                  {field.type === 'radio' && (
                    <RadioGroup>
                      {field.options && field.options.map((option, i) => (
                        
                          <RadioGroupItem key={`${field.name}-${i}`} value={option.value} id={`${field.name}-${i}`} />
                          <Label htmlFor={`${field.name}-${i}`}>{option.label}</Label>
                        
                      ))}
                    </RadioGroup>
                  )}
                  {field.type === 'checkbox' && (
                    
                      
                        <Checkbox id={field.name} />
                        <Label htmlFor={field.name}>
                          {field.label}
                        </Label>
                      
                    
                  )}
                  {field.type === 'dropdown' && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={field.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options && field.options.map((option, i) => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                
              </div>
            ))}
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
